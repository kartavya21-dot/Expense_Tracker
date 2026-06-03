import { useState } from "react";

function ExpenseSection({ categories, onAddExpense }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !expense.title ||
      !expense.amount ||
      !expense.date ||
      !expense.categoryId
    ) {
      return;
    }

    onAddExpense(expense);

    setExpense({
      title: "",
      amount: "",
      date: "",
      categoryId: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Add Expense</h2>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Title
          </label>

          <input
            name="title"
            placeholder="e.g. Pizza, Uber, Netflix"
            value={expense.title}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Amount
          </label>

          <input
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Date
          </label>

          <input
            name="date"
            type="date"
            value={expense.date}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Category
          </label>

          <select
            name="categoryId"
            value={expense.categoryId}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default ExpenseSection;
