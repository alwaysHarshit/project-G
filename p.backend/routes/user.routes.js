import {Router} from "express";
import {getResponse} from "../controller/get-response.js";
import {getRecentSubmissions} from "../controller/getRecentSumissions.js";
import {getEdgeCases} from "../controller/getEdgeCases.js";
import {LoginController} from "../controller/Login.Controller.js";
import {authMiddleware} from "../utils/jwt.middlewares.js";

export const router=Router()

//for testing-only
router.get("/h",(req,res)=>{
    res.status(200).json({
        message:"hello"
    })

})
router.post('/login',LoginController);
router.post("/recent-submissions",authMiddleware,getRecentSubmissions)
router.post('/get-response',authMiddleware,getResponse)
router.post('/get-edgesCases',getEdgeCases);
