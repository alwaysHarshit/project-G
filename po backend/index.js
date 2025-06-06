import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use((req, res, next) => {
    console.log("🟢 Incoming request from:", req.headers.origin);
    next();
});


app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.Mongo_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ connected to database");

        try {
            app.listen(process.env.PORT, () => {
                console.log(`✅ Server listening at http://localhost:${PORT}`);
            });
        } catch (listenErr) {
            console.error("❌ Error during app.listen():", listenErr);
        }
    })
    .catch((err) => {
        console.error("❌ Mongo connection error:", err);
    });

// app.listen(4000,()=>{
//     console.log("Server started on port 4000,");
//     }
// );
// app.get("/", (req, res) => {
//     res.json({
//         status: "success",
//     });
// })
