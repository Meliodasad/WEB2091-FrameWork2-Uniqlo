import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductPage from "./pages/client/ProductPage";
import ContactPage from "./pages/client/ContactPage";
import AboutPage from "./pages/client/AboutPage";
import ProductDetail from "./pages/client/ProductDetail";
import Login from "./pages/client/login";
import Register from "./pages/client/register";
import CartPage from "./pages/client/CartPage";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes cho người dùng */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Routes dành cho Admin */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} /> {/* Mặc định hiển thị Dashboard */}
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
