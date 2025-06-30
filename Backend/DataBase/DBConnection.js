import mongoose from "mongoose";
import colors from 'colors'

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MonogDB_URL);        
        console.log(`Database connected successfully`.bgGreen)
    } catch (error) {

        console.log(`Error in DB Connection`.bgRed)
    }
}
export default dbConnection
