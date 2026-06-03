import { useEffect } from "react";

import { getMe } from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../services/category_service";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  getMonthlySummary,
} from "../services/expense_service";
import { useState } from "react";
import CategorySection from "../components/CategorySection";
import ExpenseSection from "../components/ExpenseSection";

function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);

  const fetchUser = async () => {
    try {
      const user = await getMe();

      console.log(user);
    } catch {
      localStorage.removeItem("token");
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await getMonthlySummary();

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();

      setExpenses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (name) => {
    try {
      await createCategory(name);

      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await createExpense(expense);

      fetchExpenses();
      fetchSummary();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  useEffect(() => {
    fetchUser();
    fetchCategories();
    fetchExpenses();
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Expense Tracker
            </h1>

            <p className="text-slate-500">Manage your expenses efficiently</p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Top Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <CategorySection onAddCategory={handleAddCategory} />

          <ExpenseSection
            categories={categories}
            onAddExpense={handleAddExpense}
          />
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl"
              >
                <span>{category.name}</span>

                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Expenses</h2>

          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex justify-between items-center border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{expense.title}</h3>

                  <p className="text-slate-500">{expense.categoryId?.name}</p>

                  <p className="text-sm text-slate-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    ₹{expense.amount}
                  </p>

                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {summary.map((item) => (
              <div
                key={`${item._id.year}-${item._id.month}`}
                className="border rounded-xl p-4"
              >
                <p className="text-slate-500">Month {item._id.month}</p>

                <p className="text-2xl font-bold text-blue-600">
                  ₹{item.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
