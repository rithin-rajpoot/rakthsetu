import express from "express";
import {userLogin, userLogout, userSignUp,getProfile, getProfileById} from "../controllers/userControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup",userSignUp);
router.post("/login",userLogin);
router.post("/logout",isAuthenticated, userLogout)
router.get("/get-profile",isAuthenticated, getProfile)
router.get("/get-profileById/:id",isAuthenticated, getProfileById)

export default router;