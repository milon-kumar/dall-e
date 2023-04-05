import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>{
        console.log("Mongo DB Connected");
    })
    .catch((error)=>{
        console.log(error);
    });
}

export default connectDB;

// Mongodb user name And Password 
// First Name : Milon 
// Last Name : Kumar
// Email : nnhlknhwr@bugfoo.com
// Passwrod:65KUMARdev

// DB:
// UserName : nnhlknhwr
// Password : AKJll7iI58kvI9S4