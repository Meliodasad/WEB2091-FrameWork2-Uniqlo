import { useState, useEffect } from "react";
import { Table, Modal, Form, Input, message } from "antd";
import { getCategories, addCategory, deleteCategory } from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = async (values: any) => {
    await addCategory(values);
    message.success("Thêm danh mục thành công!");
    fetchCategories();
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    message.success("Xóa danh mục thành công!");
    fetchCategories();
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      render: (record: any) => (
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Quản lý danh mục</h2>
      <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>Thêm danh mục</button>
      <Table bordered dataSource={categories} columns={columns} rowKey="id" />

      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()} title="Thêm danh mục">
        <Form form={form} onFinish={handleAdd}>
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Tên danh mục" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
