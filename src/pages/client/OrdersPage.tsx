import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.fullName) {
        alert("Vui lòng đăng nhập để xem đơn hàng.");
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(`http://localhost:3001/orders?fullName=${encodeURIComponent(user.fullName)}`);
        if (!res.ok) throw new Error("Không thể lấy đơn hàng");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        alert("Lỗi kết nối đến server.");
      }
    };
    fetchOrders();
  }, [navigate]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="fw-bold text-center">📦 Đơn hàng của bạn</h2>
        {orders.length === 0 ? (
          <p className="text-center">Không có đơn hàng nào.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="border rounded p-3 mb-3">
              <h4>Đơn hàng #{order.id}</h4>
              <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Trạng thái:</strong> <span className={order.status === "Đã hủy" ? "text-danger" : "text-success"}>{order.status}</span></p>
              <h5 className="mt-3">Sản phẩm:</h5>
              {order.items.map(item => (
                <div key={item.id} className="d-flex align-items-center mb-2 border-bottom pb-2">
                  <img src={item.image} alt={item.name} className="me-3" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                  <div>
                    <p className="fw-bold mb-1">{item.name} x {item.quantity}</p>
                    <p>{(item.price * item.quantity).toLocaleString()} VND</p>
                  </div>
                </div>
              ))}
              <h5 className="mt-2">Tổng tiền: <span className="text-danger">{order.totalAmount.toLocaleString()} VND</span></h5>
              {(order.status === "Đang giao đơn hàng đến bạn") && (
                <>
                  <button className="btn btn-success mt-2 me-2" onClick={() => updateOrderStatus(order.id, "Đã giao")}>Đã nhận hàng</button>
                  <button className="btn btn-warning mt-2" onClick={() => updateOrderStatus(order.id, "Khách hàng đã hoàn đơn")}>Hoàn hàng</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
