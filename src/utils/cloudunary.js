import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// (async  function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
//     });

//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes",
//         resource_type:'auto'
//     }).catch((error)=>{console.log(error)});

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);    
// })();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         // Upload an image
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file uploded
//         console.log("file has been uploaded successfully", response.url)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
//         return null
//     }
// }
// export { uploadOnCloudinary }


// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload an image
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // File uploaded successfully
    console.log("File has been uploaded successfully", response.url);
    
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    // Remove the locally saved temporary file as the upload operation failed
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error('Error removing the temporary file:', unlinkError);
    }

    return null;
  }
};

export { uploadOnCloudinary };
