import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate(result.user.role === "admin" ? "/admin" : "/");
      } else {
        alert(result.message || "Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <span className="close-button" onClick={() => navigate("/")}>✖</span>
        <h2 className="auth-title">Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register("email", { required: "Vui lòng nhập email" })} placeholder="Email *" className="auth-input" />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          <input type="password" {...register("password", { required: "Vui lòng nhập mật khẩu" })} placeholder="Mật khẩu *" className="auth-input" />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <button type="submit" className="auth-button" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng nhập"}</button>
        </form>
        <p className="auth-divider">- Hoặc đăng nhập với -</p>
        <p className="text-center">Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link></p>
      </div>
    </div>
  );
};

export default Login;
