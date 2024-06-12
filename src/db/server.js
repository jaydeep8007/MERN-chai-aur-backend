// import mongoose from "mongoose";

// import { DB_NAME } from "../constants.js"

// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n mongoDB connected !! DB host : ${connectionInstance.connection.host}`)/*konse connection pe host hua voh pata chalega*/
//     } catch (error) {
//         console.error("MONGODB connection FAILED ", error)
//         process.exit(1)
//     }
// }

// export default connectDB

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionName = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME} `)
        console.log(`konse connection par connect he :  ${connectionName.connection.host}`)

        app.listen(process.env.PORT || 8000), () => {
            console.log(`app is listening on port : ${process.env.PORT}`)
        }
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR :", error)
    }
}
export default connectDB