import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập
    alert("✅ Đăng xuất thành công!");
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} theme="dark">
        <div className="logo">
          <h2 style={{ color: "white", textAlign: "center", padding: "16px" }}>Admin Panel</h2>
        </div>
        <Menu theme="dark" mode="vertical">
          <Menu.Item key="dashboard">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link to="/admin/categories">Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/admin/users">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link to="/admin/orders">Quản lý đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="AdminComments">
            <Link to="/admin/AdminComments">Quản lý bình luận</Link>
          </Menu.Item>
          <Menu.Item key="reports">
            <Link to="/admin/reports">Thống kê doanh thu</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung bên phải */}
      <Layout style={{ padding: "16px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Admin Dashboard</h2>
          <Button danger onClick={handleLogout}>Đăng xuất</Button>
        </div>

        {/* Phần này sẽ thay đổi khi bấm menu */}
        <Content style={{ marginTop: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
