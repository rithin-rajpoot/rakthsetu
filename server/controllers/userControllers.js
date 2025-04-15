import User from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validateUser from "../middlewares/validateUser.js";
import { errorHandler} from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userSignUp = asyncHandler(async (req, res, next) => {
  let { fullName, username, password, email, phone, bloodType, location } = req.body;
  if (!fullName || !username || !email || !phone || !password || !bloodType || !location) {
    return next(new errorHandler( "All fields are required", 400)) ;
  }
  let coordinates = location.split(",").map(Number); // split location and generate array of strings and then convert them into numbers

  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  let userData = {
    //creates and saves the user,
    fullName,
    username,
    password,
    email,
    phone,
    bloodType,
    location: {
      type: "Point",
      coordinates,
    },
  }
  validateUser(userData); // if there is any error it will throw an error caught by AsyncHandler
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  const newUser = new User(userData);
  newUser.save();
  // Generate and send JWT
  const tokenData = {
    _id: newUser?._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res
    .status(200)
    .cookie("token", token, {
      // value: token,
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token
      },
    });
});


// User Login 
export const userLogin = asyncHandler(
  async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new errorHandler("Your password or username is empty", 400))
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(new errorHandler("Your password or username is Invalid!", 400))
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(new errorHandler("Your password or username is Invalid!", 400))
    }

    // Generate and send JWT
    const tokenData = {
      _id: user?._id,
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      .json({
        success: true,
        message: "Login successful",
        responseData: {
          user,
          token
        }
      })
  }
)


export const getProfile = asyncHandler(async (req, res, next) => {
  const userData = await User.findById(req.user._id).populate('userBloodRequests');
  res.status(200).json({
    success: true,
    responseData: userData
  });

})



export const userLogout = asyncHandler(
  async (req, res, next) => {

    res.status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged out"
      });
  }
);