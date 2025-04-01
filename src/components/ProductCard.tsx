import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const user = localStorage.getItem("user");
    if (!user) {
      alert("❌ Bạn cần đăng nhập để thêm vào giỏ hàng!");
      window.location.href = "/login";
      return;
    }

    const fullName = JSON.parse(user).fullName; // Lấy theo fullName
    const cartUrl = `http://localhost:3001/cart?fullName=${fullName}`;

    try {
      const res = await fetch(cartUrl);
      let cartData = await res.json();

      if (!cartData.length) {
        // Nếu user chưa có giỏ hàng, tạo giỏ mới
        cartData = {
          fullName,
          items: [],
        };
      } else {
        cartData = cartData[0];
      }

      const existingItem = cartData.items.find(
        (item: any) => item.id === product.id
      );

      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã có
        existingItem.quantity += 1;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        cartData.items.push({ ...product, quantity: 1 });
      }

      // Gửi yêu cầu cập nhật giỏ hàng
      if (cartData.id) {
        await fetch(`http://localhost:3001/cart/${cartData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartData),
        });
      } else {
        await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartData),
        });
      }

      dispatch(addToCart({ ...product, quantity: 1 }));
      alert("🛒 Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
      alert("❌ Lỗi khi thêm vào giỏ hàng!");
    }
  };

  return (
    <div
      className="col-md-4 mb-4"
      onClick={() => (window.location.href = `/product/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card shadow-sm">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-danger fw-bold">{product.price.toLocaleString()} VND</p>
          <p className="text-muted">{product.description}</p>
          <button onClick={handleAddToCart} className="btn btn-dark">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
