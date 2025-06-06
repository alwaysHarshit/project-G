import {Router} from "express";
import {userProfileController} from "../controller/user-profile.controller.js";
import {getResponse} from "../controller/get-response.js";
import {getRecentSubmissions} from "../controller/getRecentSumissions.js";

export const router=Router()

// post requests
router.get("/h",(req,res)=>{
    res.status(200).json({
        message:"hello"
    })
})
router.post("/recent-submissions",getRecentSubmissions)
router.post('/get-user',userProfileController)
router.post('/get-response',getResponse)
