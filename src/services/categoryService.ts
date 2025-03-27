import axios from "axios";

const API_URL = "http://localhost:3001/categories"; // API danh mục sản phẩm

// 🟢 Lấy danh sách danh mục sản phẩm
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data)
      ? response.data.map((category: any) => ({
          id: category.id, // ID danh mục
          name: category.name, 
        }))
      : [];
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    return [];
  }
};

// 🟢 Thêm danh mục sản phẩm mới
export const addCategory = async (category: { name: string }) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.error("Lỗi thêm danh mục:", error);
  }
};

// 🟢 Xóa danh mục sản phẩm theo ID
export const deleteCategory = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Lỗi xóa danh mục:", error);
  }
};
