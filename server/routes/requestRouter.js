import express from "express";
import {createBloodRequest,deleteBloodRequest,getAllRequests} from "../controllers/requestControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/create-blood-request", isAuthenticated, createBloodRequest); 
router.get("/get-all-requests", isAuthenticated, getAllRequests)
router.post("/delete-request/:requestId", isAuthenticated, deleteBloodRequest );

export default router;
