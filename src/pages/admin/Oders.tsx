import { useEffect, useState } from "react";

const statusOptions = [
  "Chờ xử lý",
  "Đang chuẩn bị hàng",
  "Đang chờ người vận chuyển",
  "Đang vận chuyển",
  "Đã giao",
  "Đã hủy"
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (order.status === "Đã hủy") return order; // Nếu đã hủy, không thay đổi trạng thái
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);

    await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center">📦 Quản lý đơn hàng</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Người đặt</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.userName}</td>
              <td>
                {order.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} width={50} className="me-2" />
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.totalAmount.toLocaleString()} VND</td>
              <td>
                {order.status === "Đã hủy" ? (
                  <span className="text-danger fw-bold">Đã hủy</span>
                ) : (
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
