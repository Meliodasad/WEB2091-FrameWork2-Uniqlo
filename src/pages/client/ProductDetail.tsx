import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        return data.category;
      })
      .then((category) => {
        return fetch(`http://localhost:3001/products?category=${category}&_limit=4`);
      })
      .then((res) => res.json())
      .then((related) => {
        setRelatedProducts(related);
        setLoading(false);
      })
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, [id]);

  // Lọc bỏ sản phẩm hiện tại khỏi danh sách liên quan
  useEffect(() => {
    setRelatedProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  }, [id]);

  // Cuộn lên đầu trang khi thay đổi sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading || !product) return <div className="text-center">⏳ Đang tải sản phẩm...</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* Hình ảnh sản phẩm */}
          <div className="col-md-6">
            <img src={product.image} className="img-fluid rounded" alt={product.name} />
          </div>
          
          {/* Thông tin sản phẩm */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-danger fs-4 fw-bold">{product.price.toLocaleString()} VND</p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center">
              <label className="me-2 fw-bold">Số lượng:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control w-25"
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-dark me-2" onClick={handleAddToCart}>
                🛒 Thêm vào giỏ hàng
              </button>
              <button className="btn btn-success" onClick={handleBuyNow}>
                🛍️ Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <div className="mt-5">
          <h3 className="fw-bold">Sản phẩm liên quan</h3>
          <div className="row">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-md-3 mb-4">
                <div 
                  className="card shadow-sm" 
                  onClick={() => navigate(`/product/${item.id}`)} 
                  style={{ cursor: "pointer", transition: "transform 0.2s", border: "1px solid #ddd" }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} 
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body text-center">
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-danger fw-bold">{item.price.toLocaleString()} VND</p>
                    <button className="btn btn-outline-dark btn-sm">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
