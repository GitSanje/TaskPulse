import asyncHandler from "express-async-handler";
import userService from "../services/userServices.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { extractDataFromToken, generateAccessToken } from "../lib/util.js";
import cookieOptions from "../config/cookieOptions.js";

//asyncHandler -> catches any errors in asynchronous code and passes them to Express's default error handler

/**
 * @desc Get all users
 * @route GET api/users
 * @access Private
 */

const getAllUsers = asyncHandler(async (req, res) => {
    // get all users from db
    const users = await userService.fetchUsers();

    // If no users
    if (!users.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
});

/**
 * @desc Create new user
 * @route POST api/users/register
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {
    // get user data from req.body
    const { email, password, first_name, last_name } = req.body;

    // confirm data

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check email duplicates
    const existingEmail = await userService.checkEmail(email);
    console.log(existingEmail, "existingEmail");

    if (existingEmail) {
      return res
        .status(409)
        .json({ status: false, message: "This email already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await userService.createUser(
      email,
      hashedPwd,
      first_name,
      last_name
    );

    if (user) {
     
      return res.status(201).json({
        status: true,
        message: "Registration Successfull!",
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data received" });
    }
});

/**
 * @desc login to the app
 * @route POST api/users/login
 * @access Private
 */

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).json({
        error: "Username or email is required, and password is compulsory.",
      });
    }

    const user = await userService.findUser("email", email);
   console.log('====================================');
   console.log(email,password);
   console.log('====================================');

    if (!user) {
      return res.status(401).json({status:false, message: "No User found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: false, message: "password did not matched" });
    }

    const accessToken = generateAccessToken(user);
    //   const refreshToken = generateRefreshToken(user);

  res.cookie("accessToken", accessToken, cookieOptions);
    //   res.cookie("refreshToken", refreshToken, {
    //         ...cookieOptions,
    //         maxAge: 30 * 24 * 60 * 60 * 1000, // Refresh token valid for 30 days
    //       });
    return res.status(201).json({
      status: true,
      message: "Login Successfully",
   
    });
});

/**
 * @desc Logs out the current user by clearing the access token cookie
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Logged out successfully" });
};

/**
 * @desc Deletes a user by ID
 * @route DELETE /api/users/:id
 * @access Private (Admin only or authenticated user)
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await userService.deleteUser("id", id);

  return res
    .status(200)
    .json({ status: true, message: "User deleted successfully" });
});







const getUserFromToken = asyncHandler( async(req, res) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if(!token){
    return res.status(401).json({ status: false, error: "Unauthorized,  No Token" });
  }
  const userData = extractDataFromToken(token);
 
    
  if (!userData) {
    return res.status(401).json({ status: false, error: "Unauthorized" });
  }

  return res.status(200).json({
    status: true,
    data: userData,
  });

})



export default {
  getAllUsers,
  createNewUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserFromToken
};
