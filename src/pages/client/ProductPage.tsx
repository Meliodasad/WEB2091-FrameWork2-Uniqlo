import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner"; // Thêm banner

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 9;
  const query = useQuery();
  const searchParam = query.get("search") || "";

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);

        // Lấy danh mục duy nhất từ sản phẩm
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, []);

  // Lọc sản phẩm theo danh mục, giá & tìm kiếm
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    if (searchParam) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice, searchParam, products]);

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <Header />
      <Banner /> {/* Thêm Banner */}

      <div className="container my-4">
        <h2 className="text-center fw-bold mb-4">SẢN PHẨM</h2>

        {/* Thanh tìm kiếm */}
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/products?search=${searchQuery}`;
                }
              }}
            />
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="row mb-4">
          <div className="col-md-4">
            <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Tất cả danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="">Tất cả giá</option>
              <option value="0-500000">Dưới 500.000đ</option>
              <option value="500000-1000000">500.000đ - 1.000.000đ</option>
              <option value="1000000-2000000">1.000.000đ - 2.000.000đ</option>
              <option value="2000000-5000000">2.000.000đ - 5.000.000đ</option>
              <option value="5000000-999999999">Trên 5.000.000đ</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center">Không có sản phẩm nào.</p>
          )}
        </div>

        {/* Phân trang */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;