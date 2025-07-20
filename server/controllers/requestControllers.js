import BloodRequest from "../models/request.js"; // Import model
import matchDonor from "../controllers/utilities/matchDonor.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import { io } from "../socket/socket.js";
import { getCoordinates } from "../controllers/utilities/nameToLatLong.js";

export const createBloodRequest = asyncHandler(async (req, res, next) => {
  const { fullName, bloodType, urgency, location } = req.body;
  if (!fullName || !bloodType || !urgency || !location) {
    return next(new errorHandler("All fields are required..", 400));
  }
  const seekerId = req.user._id;

  // Usage
  const coordinates = await getCoordinates(location);
  // console.log(coordinates);
  // Create a new blood request document
  const newRequest = new BloodRequest({
    fullName,
    seekerId,
    bloodType,
    urgency,
    location: {
      type: "Point",
      coordinates,
    },
  });
  // Save to database
  const savedRequest = await newRequest.save();

  // save request into the curr user's data
  await User.findByIdAndUpdate(
    seekerId,
    { $push: { userBloodRequests: savedRequest._id } },
    { new: true }
  );
  
  // web socket implementation
  io.emit('newBloodRequest', savedRequest);

  // match Donor after saving request
  let isFound = await matchDonor(savedRequest); // returns boolean
  if (isFound) {
    // even if it is undefined not a pblm
    let data = await BloodRequest.findById(savedRequest._id).populate(
      "matchedDonorsId"
    );
    return res.status(200).json({
      success: true,
      message: "Donor's Found Successfully...!",
      responseData: {
        status: data.status,
        matchedDonors: data.matchedDonorsId,
        newBloodRequest: savedRequest,
      }
    });
  }
  
  // Respond with inserted ID
  res.status(201).json({
    success: true,
    message: "Blood request created, matching in progress!",
    responseData: {
      status: savedRequest.status,
      newBloodRequest: savedRequest,
    }
    
  });
});

export const getAllRequests = asyncHandler(async (req, res, next) => {
  const currUser = await User.findOne({ _id: req.user._id });
  // console.log(currUser);

  const nearestRequests = await BloodRequest.find({
    seekerId: { $ne: req.user._id }, // exclude user 
    location: {
      $near: {
        $geometry: currUser.location,
        $maxDistance: 10000 // 5km radius
      }
    }
  });
  // console.log(nearestRequests);
  res.status(200).json({
    success: true, responseData: {
      nearestRequests,
    }
  });
})

export const deleteBloodRequest = asyncHandler(async (req, res, next) => {
  const currUserId = req.user._id;
  const requestId = req.params.requestId;
  await User.findByIdAndUpdate(currUserId,  {$pull: {userBloodRequests: requestId}});

  await BloodRequest.findByIdAndDelete(requestId);
  
   // web socket implementation
   io.emit('removeRequest', requestId);

  res.status(200).json({
    success: true,
    responseData: {
      message: "Request Deleted Successfully",
      deletedRequestId: requestId,
    }
  })

})
