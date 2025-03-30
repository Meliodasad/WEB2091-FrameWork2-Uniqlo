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
  const [users, setUsers] = useState({}); // Lưu userId -> fullName
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          fetch("http://localhost:3001/orders"),
          fetch("http://localhost:3001/users")
        ]);

        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();

        // Chuyển danh sách users thành object { userId: fullName }
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user.fullName; // Fix lỗi: Dùng fullName thay vì userName
          return acc;
        }, {});

        setUsers(usersMap);
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (order.status === "Đã hủy") return order; // Không thay đổi nếu đã hủy
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

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

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
              <td>{users[order.userId] || "Không xác định"}</td>
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
