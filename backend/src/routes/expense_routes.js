import express from "express";

import protectRoute from "../middleware/auth_middleware.js";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getCategorySummary,
  getMonthlySummary
} from "../controllers/expense_controller.js";

const router = express.Router();

router.post("/", protectRoute, createExpense);

router.get("/", protectRoute, getExpenses);

router.put("/:id", protectRoute, updateExpense);

router.delete("/:id", protectRoute, deleteExpense);

router.get("/summary/monthly", protectRoute, getMonthlySummary);

router.get("/summary/category", protectRoute, getCategorySummary);

export default router;
