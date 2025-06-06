import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from "./routes/user.routes.js";


const app = express();
dotenv.configDotenv();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.Mongo_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`localhost:${process.env.PORT}`);
            // Example usage of the AI model
            // main({
            //     name: "Sample Problem",
            //     description: "This is a sample problem description.",
            //     topics: ["arrays", "strings"],
            //     difficulty: "easy",
            //     code: "function sample() { return 'Hello, World!'; }"
            // }).then((response) => {
            //     console.log("AI Response:", response);
            // });
        });
        console.log("✅ connected to database");

    })
    .catch((err) => {
            console.log("❌ mongo connection error",err);
        }
    )

app.use('/',router)
