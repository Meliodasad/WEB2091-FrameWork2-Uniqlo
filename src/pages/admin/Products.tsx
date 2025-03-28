import { useState, useEffect } from "react";
import { Table, Modal, Form, Input, InputNumber, Select, message, Button } from "antd";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // 🟢 Lấy danh sách sản phẩm & danh mục khi load trang
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    console.log("🔍 Danh sách sản phẩm:", data);
    setProducts(Array.isArray(data) ? data : []);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(Array.isArray(data) ? data : []);
  };

  // 🟢 Thêm / Cập nhật sản phẩm
  const handleSubmit = async (values) => {
    console.log("📤 Dữ liệu gửi đi:", values);

    const formattedValues = { ...values, category: String(values.category) };

    try {
      if (editingProduct?._id || editingProduct?.id) {
        await updateProduct(editingProduct._id || editingProduct.id, formattedValues);
        message.success("Cập nhật sản phẩm thành công!");
      } else {  
        await addProduct(formattedValues);
        message.success("Thêm sản phẩm thành công!");
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      message.error("❌ Có lỗi xảy ra khi thêm/cập nhật sản phẩm!");
    }
  };

  // 🟢 Xóa sản phẩm
  const handleDelete = async (id) => {
    console.log("🛑 ID sản phẩm cần xóa:", id);

    if (!id) {
      message.error("❌ Không tìm thấy ID sản phẩm!");
      return;
    }

    try {
      await deleteProduct(id);
      message.success("Xóa sản phẩm thành công!");

      // 🔥 Fix lỗi: Chỉ cập nhật state khi xóa thành công
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id && product.id !== id));
    } catch (error) {
      message.error("❌ Lỗi khi xóa sản phẩm!");
    }
  };

  // 🟢 Chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  // 🟢 Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // 🟢 Cấu hình cột của bảng
  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId || cat.id === categoryId);
        return category ? category.name : "Không xác định";
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (url) => <img src={url} alt="product" width="50" />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc) => (desc ? desc.slice(0, 50) + "..." : "Không có mô tả"),
    },
    {
      title: "Hành động",
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="dashed" danger onClick={() => handleDelete(record._id || record.id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Quản lý sản phẩm</h2>
      <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>Thêm sản phẩm</button>
      <Table bordered dataSource={products} columns={columns} rowKey={(record) => record._id || record.id} />

      {/* Modal thêm/sửa sản phẩm */}
      <Modal open={isModalOpen} onCancel={handleCloseModal} onOk={() => form.submit()} title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}><InputNumber min={0} /></Form.Item>
          <Form.Item name="image" label="Hình ảnh"><Input /></Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Select.Option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
