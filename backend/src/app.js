import express from "express";
import cors from "cors";
import { setServers } from "dns";
setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

import authRoutes from "./routes/auth_routes.js";
import categoryRoutes from "./routes/category_routes.js";
import expenseRoutes from "./routes/expense_routes.js";

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker Running",
  });
});

export default app;
