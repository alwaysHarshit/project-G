import {Router} from "express";
import {userController} from "../controller/user.controller.js";
import {userInfoController} from "../controller/user-info.controller.js";

export const router=Router()
router.post('/chat',userController)
router.post('/user-info',userInfoController)
