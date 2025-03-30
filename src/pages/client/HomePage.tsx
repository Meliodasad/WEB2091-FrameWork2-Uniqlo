import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import Chat from "../../components/chat"; // Import Chat

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Lấy danh sách sản phẩm từ API
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.fullName); // Hiển thị tên người dùng
    }
  }, []);

  return (
    <>
      <Header />
      <Banner />

      <div className="container my-5">
        {/* Hiển thị lời chào */}
        <h3 className="text-center fw-bold mb-4">
          {userName ? `Xin chào, ${userName}!` : "Chào mừng bạn đến với cửa hàng!"}
        </h3>

        <h2 className="text-center fw-bold mb-4">SẢN PHẨM NỔI BẬT</h2>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Thêm Chat */}
      <Chat />

      <Footer />
    </>
  );
};

export default HomePage;
