import {Router} from "express";
import {aiOperations} from "../utils/ai-operations.js";
import {userProfileController} from "../controller/user-profile.controller.js";
import {getResponse} from "../controller/get-response.js";
import {getRecentSubmissions} from "../controller/getRecentSumissions.js";

export const router=Router()

// post requests
router.post("/recent-submissions",getRecentSubmissions)
router.post('/getUser',userProfileController)
router.post('/get-response',getResponse)
