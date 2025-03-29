import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    statusCount: {},
    totalProductsSold: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((orders) => {
        let totalRevenue = 0;
        let totalOrders = orders.length;
        let statusCount = {
          "Chờ xử lý": 0,
          "Đang chuẩn bị hàng": 0,
          "Đang chờ vận chuyển": 0,
          "Đang vận chuyển": 0,
          "Đã giao": 0,
        };
        let totalProductsSold = 0;

        orders.forEach((order) => {
          totalRevenue += order.totalAmount;
          statusCount[order.status] = (statusCount[order.status] || 0) + 1;
          order.items.forEach((item) => {
            totalProductsSold += item.quantity;
          });
        });

        setStats({ totalRevenue, totalOrders, statusCount, totalProductsSold });
      })
      .catch((err) => console.error("Lỗi tải dữ liệu", err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center">📊 Thống kê đơn hàng</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h4>💰 Tổng doanh thu</h4>
            <p className="fw-bold text-success">{stats.totalRevenue.toLocaleString()} VND</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h4>📦 Tổng số đơn hàng</h4>
            <p className="fw-bold">{stats.totalOrders}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h4>🔢 Số sản phẩm đã bán</h4>
            <p className="fw-bold">{stats.totalProductsSold}</p>
          </div>
        </div>
      </div>
      <h3 className="fw-bold mt-4">📌 Thống kê trạng thái đơn hàng</h3>
      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>Trạng thái</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats.statusCount).map(([status, count]) => (
            <tr key={status}>
              <td>{status}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
