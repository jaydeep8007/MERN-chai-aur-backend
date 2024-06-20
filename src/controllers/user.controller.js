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
import { ApiResponse } from "../utils/ApiResponse.js"



const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh tokens")
    }
}

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
    console.log( email)

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    //    const existedUser =  User.findOne({
    //         $or:[{username} , {email}]
    //     })

    //     if(existedUser){
    //         throw new ApiError(400 , "user with email or username already existed")
    //     }

    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, "user with email  already existed")
    }
    // console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path ?? '';


    console.log('Avatar Path: ', avatarLocalPath);
    console.log('Cover Image Path: ', coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar localpath is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar is required")
    }

    const user = await User.create({
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
        new ApiResponse(200, createdUser, "User created successfully")
    )

});

const loginUser = asyncHandler(async (req, res) => {
    //req body => data 


    const { username, email , password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "email or username is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
 

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
            "user logged in successfully"))


})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "user logged out"))

})

export { registerUser, loginUser, logoutUser };