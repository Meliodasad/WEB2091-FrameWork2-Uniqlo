import { useEffect, useState } from "react";

const statusOptions = [
  "Chờ xử lý",
  "Đang chuẩn bị hàng",
  "Đang chờ người vận chuyển",
  "Đang vận chuyển",
  "Đang giao đơn hàng đến bạn"
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders");
        const data = await response.json();

        // Cập nhật orders với đầy đủ thông tin
        const ordersWithDetails = data.map((order) => {
          return {
            ...order,
            fullName: order.fullName, // Lấy tên đầy đủ
            address: `${order.address.street}, ${order.address.district}, ${order.address.province}`, // Kết hợp địa chỉ đầy đủ
            paymentStatus: order.paymentMethod // Trạng thái thanh toán theo paymentMethod
          };
        });

        setOrders(ordersWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const currentIndex = statusOptions.indexOf(order.status);
        const nextStatus = statusOptions[currentIndex + 1];
        
        // Nếu chọn ngược lại hoặc trạng thái không phải tiếp theo, không thay đổi
        if (newStatus !== nextStatus) return order;

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

  const getStatusClass = (status) => {
    if (status === "Đã giao") return "text-success fw-bold";
    if (status === "Đã hủy" || status === "Khách hàng đã hoàn đơn") return "text-danger fw-bold";
    return "";
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
            <th>Địa chỉ</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái thanh toán</th>
            <th>Trạng thái </th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.fullName}</td>
              <td>{order.address}</td>
              <td>
                {order.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} width={50} className="me-2" />
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.totalAmount.toLocaleString()} VND</td>
              <td>{order.paymentStatus}</td>
              <td className={getStatusClass(order.status)}>{order.status}</td>
              
              <td>
                {!["Đã hủy", "Đã giao", "Khách hàng đã hoàn đơn"].includes(order.status) ? (
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {statusOptions.map((status, index) => {
                      const currentIndex = statusOptions.indexOf(order.status);
                      const nextStatus = statusOptions[currentIndex + 1];
                      
                      // Vô hiệu hóa các trạng thái không phải là trạng thái tiếp theo
                      return (
                        <option key={status} value={status} disabled={status !== nextStatus}>
                          {status}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
