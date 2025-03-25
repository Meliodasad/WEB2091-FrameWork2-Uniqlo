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
      const res = await fetch("http://localhost:3001/users");
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu người dùng");
      
      const users = await res.json();
      const user = users.find((u: any) => u.email === data.email && u.password === data.password);
      
      if (!user) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
      }
      
      localStorage.setItem("user", JSON.stringify(user));
      alert("Đăng nhập thành công!");
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      alert("Lỗi kết nối đến server.");
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
          <input 
            type="email" 
            {...register("email", { required: "Vui lòng nhập email" })} 
            placeholder="Email *" 
            className="auth-input" 
            disabled={loading}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <input 
            type="password" 
            {...register("password", { required: "Vui lòng nhập mật khẩu" })} 
            placeholder="Mật khẩu *" 
            className="auth-input" 
            disabled={loading}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        
        <p className="auth-divider">- Hoặc đăng nhập với -</p>
        <p className="text-center">
          Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
