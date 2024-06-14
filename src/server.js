
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app.js";
import { DB_NAME } from "./constants.js";

// Function to connect to the database and start the server
const connectDBAndStartServer = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected to MongoDB: ${connection.connection.host}`);

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit process with failure
    }
};

connectDBAndStartServer();



// import dotenv from "dotenv";

// import mongoose from "mongoose";
// import { app } from "./app.js";
// import { DB_NAME } from "./constants.js";


// dotenv.config()

//     // iffi approach to connect with DB ,  but we dont use that it's just for learning


//     ; (async () => {
//         try {
//             const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//             console.log(`konse connection par connect he :  ${connection.connection.host}`)


//             const PORT = process.env.PORT || 8000;
//             app.listen(PORT, () => {
//                 console.log(`Server is running on port ${PORT}`);
//             });

//         } catch (error) {
//             console.error("ERROR in iffi catch part", error)
//         }
//     })()
