// const asyncHandler = (fnc)=>async (req , res , next)=>{
//     try {
        
//     } catch (error) {
//         res.status(error.code || 500) .json({
//             success :false ,
//             message : error.message
//         })
//     }
// }

// export {asyncHandler}

// or

const asyncHandler = (requestHandler)=>{async (req, res , next)=>{
    Promise.resolve(requestHandler(req, res , next)).catch((err)=>next(err))
}}
export {asyncHandler}