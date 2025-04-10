import User from "../../models/user.js";
import BloodRequest from "../../models/request.js";

const matchDonor = async (bloodRequest) => {
         
        const nearestDonors = await User.find({
              bloodType: bloodRequest.bloodType,
              _id: { $ne: bloodRequest.seekerId }, // exclude seeker 
              location: {
                  $near: {
                      $geometry: bloodRequest.location,
                      $maxDistance: 5000 // 5km radius
                }
            }
        });
        // console.log(nearestDonors) // if not found returns empty array
        if (nearestDonors.length > 0){
            // Update the blood request with matched donor
            await BloodRequest.findByIdAndUpdate(bloodRequest._id, {
                $set: { status: "Matched" },
                $push: { matchedDonorsId: { $each: nearestDonors.map(donor => donor._id) } }
            });
            return true;
        }
            return false;
};

export default matchDonor;
