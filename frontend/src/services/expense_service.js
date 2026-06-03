import api from "../api/axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getExpenses = async () => {
  const response = await api.get("/expenses", {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const createExpense = async (expense) => {
  const response = await api.post("/expenses", expense, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getMonthlySummary = async () => {
  const response = await api.get("/expenses/summary/monthly", {
    headers: getAuthHeaders(),
  });

  return response.data;
};