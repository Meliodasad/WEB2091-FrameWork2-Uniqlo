import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn chuyển sang trang chi tiết
    dispatch(addToCart({ ...product, quantity: 1 }));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm" onClick={() => window.location.href = `/product/${product.id}`} style={{ cursor: "pointer" }}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-danger fw-bold">{product.price.toLocaleString()} VND</p>
          <button onClick={handleAddToCart} className="btn btn-dark">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
