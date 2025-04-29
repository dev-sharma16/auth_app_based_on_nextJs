import { error } from "console";
import mongoose from "mongoose";

export async function connect(){
    try {
  
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDb connected successfuly..!'); 
        })

        connection.on('error', ()=>{
            console.log("MongoDb can't connect..!, Erros: "+error);
            process.exit(); 
        })
  
    } catch (error) {

        console.log("Something went Wrong..!");
        console.log(error);
   
    }
}
