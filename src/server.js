

// import dotenv from "dotenv"

// import connectDB from "./db/server.js";


// // dotenv.config({ path: "./env" })
// dotenv.config()

// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT || 8000), () => {
//             console.log(`app is listening on port : ${process.env.PORT}`)
//         }
//     })
//     .catch((err) => {
//         console.log("MONGO db connection failed !!! ", err)
//     })









// this is one approach to connect with database and connect with express but we polute our server.js with so many things here thats why we move to second approach 


import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import Express from "express";
const app = Express()


    // iffi approach to connect with DB ,  but we dont use that it's just for learning


    ; (async () => {
        try {
            const connectionName = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`konse connection par connect he :  ${connectionName.connection.host}`)
            app.on("ERROR", (error) => {
                console.log("ERR", error)
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`app is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error("ERROR in iffi catch part")
        }
    })()
   

