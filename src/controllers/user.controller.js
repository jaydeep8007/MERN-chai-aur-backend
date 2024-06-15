// import { asyncHandler } from "../utils/asyncHandler.js"

// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok"
//     })
// })

// export { registerUser }

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudunary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //if user already exist
    //check for images - check for avatar 
    //upload them to cloudinary - avatar
    //create user object  , create entry in db
    //remove refresh token from responce
    //check for user creation 
    //return responce 

    const { fullName, email, username, password } = req.body
    console.log('email : ', email)

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    //    const existedUser =  User.findOne({
    //         $or:[{username} , {email}]
    //     })

    //     if(existedUser){
    //         throw new ApiError(400 , "user with email or username already existed")
    //     }

    const existedUser = User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, "user with email  already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file  is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar is required")
    }

    const user = User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User created successfully")
    )

});

export { registerUser };