import { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">SẢN PHẨM NỔI BẬT</h2>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
