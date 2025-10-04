import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from "./routes/user.routes.js";

dotenv.config(
)

const app = express();

//for dev purposes only
app.use(cors());


// for prod purposes only
// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }));

// app.use((req, res, next) => {
//     console.log("🟢 Incoming request from:", req.headers.origin);
//     next();
// });


app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.Mongo_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ connected to database");

    })
    .catch((err) => {
        console.error("❌ Mongo connection error:", err);
    });

try {
    app.listen(process.env.PORT, `0.0.0.0`,() => {
        console.log(`✅ Server listening at http://localhost:${PORT}`);
    });
} catch (listenErr) {
    console.error("❌ Error during app.listen():", listenErr);
}