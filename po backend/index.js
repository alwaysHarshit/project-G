import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import {main} from "./ai-models/gemini.js";
import {router} from "./routes/user.routes.js";


const app = express();
dotenv.configDotenv();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.Mongo_URI)
    .then(() => {
        console.log("✅ connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
            console.log("❌ mongo connection error",err);
        }
    )
app.use('/',router)


