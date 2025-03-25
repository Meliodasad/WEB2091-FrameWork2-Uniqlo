import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // File CSS riêng

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/categories">Quản lý danh mục</Link></li>
        <li><Link to="/admin/products">Quản lý sản phẩm</Link></li>
        <li><Link to="/admin/users">Quản lý người dùng</Link></li>
        <li><Link to="/admin/employees">Quản lý nhân viên</Link></li>
        <li><Link to="/admin/orders">Quản lý đơn hàng</Link></li>
        <li><Link to="/admin/reports">Thống kê doanh thu</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
