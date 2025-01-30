import mongoose from "mongoose"; ; 
export const MongoDb_String = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected tob mongo");
        
    }catch(error){
        console.log(`error while connecting to db ${error}`)
    }
}
