import express from "express";
import {createBloodRequest,getAllRequests} from "../controllers/requestControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/create-blood-request", isAuthenticated, createBloodRequest); //

router.get("/get-all-requests", isAuthenticated, getAllRequests)
export default router;
