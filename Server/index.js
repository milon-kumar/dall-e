import express from "express";
import * as dotenv from "dotenv";
import cros from "cors";

import connectDB from "./mongodb/conntct.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";


dotenv.config();

const app = express();

app.use(cros());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post',postRoutes);

app.use('/api/v1/dalle',dalleRoutes);


app.get('/',(req,res)=>{
    res.send('Hello from Dall-E');
});

const startServer = async() => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(3000,() => {
            console.log("Server has started on port http://localhost:3000");
        });
    }catch(error){
        console.log(error);
    }
}

startServer();