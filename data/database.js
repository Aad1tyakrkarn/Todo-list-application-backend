import mongoose from "mongoose";

export const connectDB = () =>{
 mongoose
    .connect("mongodb://127.0.0.1:27017",{
        dbname: "backendapi",
        // bufferCommands: false,
        })        
        .then(()=>console.log("Database connected"))        
        .catch((e)=>console.log(e));
    }

