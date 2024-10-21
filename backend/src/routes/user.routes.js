import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { resizeImage } from "../middlewares/resizeMiddleware.js";
import { createUser, listUsers, topUsers } from "../controllers/userController.js";

const router = Router();

router.post("/create", upload.single("avatar"), resizeImage, createUser);

router.get("/all", listUsers);

router.get("/get/top", topUsers);

export default router