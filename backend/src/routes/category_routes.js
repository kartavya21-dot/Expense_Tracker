import express from "express";

import protectRoute from "../middleware/auth_middleware.js";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category_controller.js";

const router = express.Router();

router.post("/", protectRoute, createCategory);

router.get("/", protectRoute, getCategories);

router.put("/:id", protectRoute, updateCategory);

router.delete("/:id", protectRoute, deleteCategory);

export default router;
