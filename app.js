import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product-routes";
import router from "./routes/user-routes";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/product",productRouter);





mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!!"))
    .catch((error)=>{console.log(error);});

    // test to check the port
// app.use("/api",(req,res,next) => {
//     res.send("Hello Bala")
// })

app.listen(process.env.PORT || 5000,() => {
    console.log("Backend server is running!!!");
});

