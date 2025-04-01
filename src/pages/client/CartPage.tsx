import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CartPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const fullName = user ? JSON.parse(user).fullName : "";
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!fullName) return;

    fetch(`http://localhost:3001/cart?fullName=${fullName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCartItems(data[0].items);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));
  }, [fullName]);

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [id]: !prev[id] };
      calculateTotalAmount(newSelectedItems);
      return newSelectedItems;
    });
  };

  const calculateTotalAmount = (newSelectedItems: { [key: string]: boolean }) => {
    let total = 0;
    cartItems.forEach((item) => {
      if (newSelectedItems[item.id]) {
        total += item.price * item.quantity;
      }
    });
    setTotalAmount(total);
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) => selectedItems[item.id]);

    // Điều hướng đến trang Checkout và truyền dữ liệu giỏ hàng
    navigate("/checkout", { state: { selectedProducts, totalAmount } });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="fw-bold text-center">🛒 Giỏ hàng của bạn</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Giỏ hàng trống.</p>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                  <input
                    type="checkbox"
                    className="form-check-input me-3"
                    checked={selectedItems[item.id] || false}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                  <img src={item.image} alt={item.name} className="img-thumbnail" width={80} />
                  <div className="ms-3 w-50">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="text-danger fw-bold">{item.price.toLocaleString()} VND</p>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="form-control w-25 mx-2"
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  />
                  <p className="fw-bold">{(item.price * item.quantity).toLocaleString()} VND</p>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="p-4 bg-light rounded shadow">
                <h4 className="fw-bold">Tóm tắt đơn hàng</h4>
                <p className="fw-bold">
                  Tổng tiền: <span className="text-danger">{totalAmount.toLocaleString()} VND</span>
                </p>

                <button
                  className="btn btn-success w-100 my-2"
                  onClick={handleCheckout}
                  disabled={totalAmount === 0}
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
