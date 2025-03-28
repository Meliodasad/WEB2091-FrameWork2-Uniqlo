import { useState, useEffect } from "react";
import { Table, Input, Button, Space, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      message.error("Lỗi tải danh sách người dùng");
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
      message.success("Xóa người dùng thành công");
      fetchUsers();
    } catch (error) {
      message.error("Xóa thất bại, thử lại sau!");
    }
  };

  const columns = [
    { title: "Họ tên", dataIndex: "fullName", key: "fullName" }, // Đổi fullname -> fullName
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary">Sửa</Button>
          <Button danger onClick={() => deleteUser(record.id)}>Xóa</Button>
        </Space>
      )
    }
  ];
  

  return (
    <div>
      <h2>Quản lý Người Dùng</h2>
      <Input
        placeholder="Tìm kiếm người dùng..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
  dataSource={users
    .filter(user => user.fullName?.toLowerCase().includes(search.toLowerCase()))}
  columns={columns}
  rowKey="id"
/>

    </div>
  );
};

export default Users;
