import axios from "axios";

const API_URL = "http://localhost:3001/products";

// 🟢 Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("🔍 API Response (Products):", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error("❌ Lỗi lấy sản phẩm:", error?.response?.data?.message || error.message || "Lỗi không xác định");
    return [];
  }
};

// 🟢 Thêm sản phẩm mới
export const addProduct = async (product: any) => {
  try {
    const response = await axios.post(API_URL, product);
    console.log("✅ Thêm sản phẩm thành công:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi thêm sản phẩm:", error?.response?.data?.message || error.message || "Lỗi không xác định");
    throw error; // Ném lỗi để hiển thị message trên giao diện
  }
};

// 🟢 Xóa sản phẩm theo ID
export const deleteProduct = async (id: string) => {
  if (!id) {
    console.error("❌ Không tìm thấy ID sản phẩm để xóa!");
    return;
  }
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`✅ Sản phẩm có ID: ${id} đã bị xóa.`);
    return { success: true, id };
  } catch (error: any) {
    console.error(`❌ Lỗi xóa sản phẩm (ID: ${id}):`, error?.response?.data?.message || error.message || "Lỗi không xác định");
    throw error;
  }
};

// 🟢 Cập nhật sản phẩm theo ID
export const updateProduct = async (id: string, product: any) => {
  if (!id) {
    console.error("❌ Không tìm thấy ID sản phẩm để cập nhật!");
    return;
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    console.log(`✅ Cập nhật sản phẩm ID: ${id} thành công.`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Lỗi cập nhật sản phẩm (ID: ${id}):`, error?.response?.data?.message || error.message || "Lỗi không xác định");
    throw error;
  }
};
