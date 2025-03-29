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
import Checkout from "./pages/client/Checkout";
import OrdersPage from "./pages/client/OrdersPage";
import Orders from "./pages/admin/Oders";
import AdminDashboard from "./pages/admin/thongke";

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Routes dành cho Admin */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} /> {}
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
