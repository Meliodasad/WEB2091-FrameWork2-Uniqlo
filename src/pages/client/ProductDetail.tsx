import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Rate } from "antd";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        return data.category;
      })
      .then((category) => fetch(`http://localhost:3001/products?category=${category}&_limit=4`))
      .then((res) => res.json())
      .then((related) => {
        setRelatedProducts(related);
        setLoading(false);
      })
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/reviews?productId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const handleReviewSubmit = () => {
    if (!newReview.user || !newReview.comment) return alert("Vui lòng nhập đầy đủ thông tin!");

    const reviewData = { ...newReview, productId: id };
    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => setReviews([...reviews, data]));

    setNewReview({ user: "", comment: "", rating: 5 });
  };

  if (loading || !product) return <div className="text-center">⏳ Đang tải sản phẩm...</div>;

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} className="img-fluid rounded" alt={product.name} />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-danger fs-4 fw-bold">{product.price.toLocaleString()} VND</p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center">
              <label className="me-2 fw-bold">Số lượng:</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-control w-25" />
            </div>
            <div className="mt-3">
              <button className="btn btn-dark me-2" onClick={handleAddToCart}>🛒 Thêm vào giỏ hàng</button>
              <button className="btn btn-success" onClick={handleBuyNow}>🛍️ Mua ngay</button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="fw-bold">Bình luận & Đánh giá</h3>
          <ul className="list-group">
            {reviews.map((review) => (
              <li key={review.id} className="list-group-item">
                <strong>{review.user}</strong>: {review.comment} <Rate disabled defaultValue={review.rating} />
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <input type="text" className="form-control mb-2" placeholder="Tên của bạn" value={newReview.user} onChange={(e) => setNewReview({ ...newReview, user: e.target.value })} />
            <textarea className="form-control mb-2" placeholder="Nhập bình luận..." value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}></textarea>
            <Rate defaultValue={5} onChange={(value) => setNewReview({ ...newReview, rating: value })} />
            <button className="btn btn-primary mt-2" onClick={handleReviewSubmit}>Gửi đánh giá</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
