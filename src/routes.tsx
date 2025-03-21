import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductPage from "./pages/client/ProductPage";
import ContactPage from "./pages/client/ContactPage";
import AboutPage from "./pages/client/AboutPage";
import ProductDetail from "./pages/client/ProductDetail";
import Login from "./pages/client/login"; // Import trang đăng nhập
import Register from "./pages/client/register"; // Import trang đăng ký
import CartPage from "./pages/client/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} /> {/* Định tuyến đăng nhập */}
        <Route path="/register" element={<Register />} /> {/* Định tuyến đăng ký */}
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
