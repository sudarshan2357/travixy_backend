import express from "express";
import { 
    createTour, 
    deleteTour, 
    getAllTour, 
    getFeaturedTour, 
    getSingleTour, 
    getTourBySearch, 
    getTourCount, 
    updateTour 
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/VerifyToken.js";


const router = express.Router();


// Create new tour
router.post("/", verifyAdmin, createTour);

// Update tour
router.put("/:id", verifyAdmin, updateTour);

// Delete tour
router.delete("/:id", verifyAdmin, deleteTour);

// get single tour
router.get("/:id", getSingleTour);

// get all tour
router.get("/", getAllTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

// get featured tour
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);


export default router;