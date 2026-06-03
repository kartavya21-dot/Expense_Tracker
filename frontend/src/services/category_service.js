import api from "../api/axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getCategories = async () => {
  const response = await api.get("/categories", {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const createCategory = async (name) => {
  const response = await api.post(
    "/categories",
    { name },
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};