import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(() => {
      // Lưu thông tin người dùng vào localStorage với key "registeredUser"
      localStorage.setItem("registeredUser", JSON.stringify(data));

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setLoading(false);
      navigate("/login"); // Chuyển hướng sang trang đăng nhập
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        {/* Thêm sự kiện onClick để khi bấm vào "✖" sẽ về trang chủ */}
        <span className="close-button" onClick={() => navigate("/")}>✖</span>
        
        <h2 className="auth-title">Đăng ký</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("fullName", { required: "Vui lòng nhập họ tên" })}
            placeholder="Họ và tên *"
            className="auth-input"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

          <input
            type="email"
            {...register("email", { required: "Vui lòng nhập email" })}
            placeholder="Email *"
            className="auth-input"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
            placeholder="Mật khẩu *"
            className="auth-input"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button type="submit" className="auth-button">
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="auth-divider">- Hoặc đăng ký với -</p>
        <p className="text-center">
          Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
