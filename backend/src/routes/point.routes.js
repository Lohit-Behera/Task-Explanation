import { Router } from "express";
import { addPoints } from "../controllers/pointsController.js";

const router = Router();

router.put("/add/:userId", addPoints);

export default router;