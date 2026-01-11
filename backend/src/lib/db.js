import mongoose from 'mongoose'

export const connectDb = async () =>{
    try{
    
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/meetBridge`)
        console.log(`MongoDb Connected: ${conn.connection.host}`)
    }catch(e){
        console.log("Error connecting to mongoDb",e);
        process.exit(1);
    }
}
export default connectDb