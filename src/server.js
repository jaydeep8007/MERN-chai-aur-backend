// require('dotenv').config({path : "./env"})



import dotenv from "dotenv"
import connectDB from "./db/server.js";


dotenv.config({ path: "./env" })

connectDB()







/*

//this is one approach to connect with database and connect with express but we polute our server.js with so many things here thats why we move to second approach 
 require('dotenv').config({path : "./env"})

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import Express from "express";
const app = Express()


    // iffi approach to connect with DB ,  but we dont use that it's just for learning
    ; (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("ERROR", (error) => {
                console.log("ERR", error)
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`app is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error("ERROR in ")
        }
    })()
    */