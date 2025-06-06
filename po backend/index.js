import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from "./routes/user.routes.js";


const app = express();
dotenv.configDotenv();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.Mongo_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`localhost:${process.env.PORT}`);
        });
        console.log("✅ connected to database");

    })
    .catch((err) => {
            console.log("❌ mongo connection error",err);
        }
    )

app.use('/',router)