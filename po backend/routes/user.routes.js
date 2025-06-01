import {Router} from "express";
import {userController} from "../controller/user.controller.js";

export const router=Router()
router.post('/chat',userController)