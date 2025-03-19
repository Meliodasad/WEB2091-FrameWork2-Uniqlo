import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/login"; // Import trang đăng nhập
import Register from "./pages/register"; // Import trang đăng ký

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
      </Routes>
    </Router>
  );
}

export default App;
