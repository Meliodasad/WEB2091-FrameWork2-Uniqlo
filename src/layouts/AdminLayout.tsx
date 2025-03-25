import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css"; // File CSS riêng

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn">Đăng xuất</button>
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
