import AdminLayout from "../../layouts/AdminLayout";

const HomeAdmin = () => {
  return (
    <AdminLayout>
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <p>Chào mừng bạn đến với trang quản trị!</p>
        <div className="admin-stats">
          <div className="stat-box">
            <h2>10</h2>
            <p>Sản phẩm</p>
          </div>
          <div className="stat-box">
            <h2>5</h2>
            <p>Người dùng</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomeAdmin;
