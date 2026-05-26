import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// function connectDB(){
//     mongoose.connect('mongodb://127.0.0.1:27017/myapp').then(()=>{
//         console.log("Connected to MongoDB");
//     })
// }

// .then and async/await are two different ways we return a promise. using .then we write in the above way and 
// using async and await we write in the below mentioned way
const mongo_uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp';
async function connectDB(){
    await mongoose.connect(mongo_uri);
    console.log(`Connected to MongoDB. MongoDB is serving in ${mongo_uri}`);
}

export default connectDB;