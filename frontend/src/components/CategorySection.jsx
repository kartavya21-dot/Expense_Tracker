import { useState } from "react";

function CategorySection({ onAddCategory }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAddCategory(name);

    setName("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Categories</h2>

      <div className="flex gap-3">
        <input
          placeholder="e.g. Food, Travel, Rent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Add
        </button>
      </div>

      <p className="text-sm text-slate-500 mt-3">
        Create categories to organize your expenses.
      </p>
    </div>
  );
}

export default CategorySection;
