// import { asyncHandler } from "../utils/asyncHandler.js"

// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok"
//     })
// })

// export { registerUser }

import { asyncHandler } from "../utils/asyncHandler.js";

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

    const {fullName , email , username , password} = req.body 
    console.log('email : ', email)
});

export { registerUser };