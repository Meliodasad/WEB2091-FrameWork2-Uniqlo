import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, [id]);

  if (!product) return <div className="text-center">Loading...</div>;

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
            <button className="btn btn-dark">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
