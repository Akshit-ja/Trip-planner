import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "./../controllers/tourController.js";
import { adminAuth } from "./../utils/verifyToken.js";
import { getImage } from "../controllers/plannerController.js";

const router = express.Router();

router.get('/planner', getImage)

// create new tour
router.post("/create", createTour);

// update  tour
router.put("/:id", adminAuth, updateTour);

// delete tour
router.delete("/:id", adminAuth, deleteTour);

// get single tour
router.get("/:id", getSingleTour);

// get all tours
router.get("/", getAllTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
