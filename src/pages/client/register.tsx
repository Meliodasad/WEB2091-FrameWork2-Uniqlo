import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"; // Đảm bảo file styles.css tồn tại

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const newUser = { ...data, role: "customer" };
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      } else {
        alert("Đăng ký thất bại! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <span className="close-button" onClick={() => navigate("/")}>✖</span>
        <h2 className="auth-title">Đăng ký</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("fullName", { required: "Vui lòng nhập họ tên" })} placeholder="Họ và tên *" className="auth-input" />
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
          <input type="email" {...register("email", { required: "Vui lòng nhập email" })} placeholder="Email *" className="auth-input" />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          <input type="password" {...register("password", { required: "Vui lòng nhập mật khẩu" })} placeholder="Mật khẩu *" className="auth-input" />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <button type="submit" className="auth-button">{loading ? "Đang xử lý..." : "Đăng ký"}</button>
        </form>
        <p className="auth-divider">- Hoặc đăng ký với -</p>
        <p className="text-center">Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link></p>
      </div>
    </div>
  );
};

export default Register;
