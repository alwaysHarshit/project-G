import {Router} from "express";
import {codeFeedbackController} from "../controller/code-feedback.controller.js";
import {userProfileController} from "../controller/user-profile.controller.js";

export const router=Router()
router.post('/chat',codeFeedbackController)
router.post('/user-info',userProfileController)
