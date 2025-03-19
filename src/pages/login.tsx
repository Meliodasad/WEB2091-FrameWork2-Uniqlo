import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(() => {
      // Lấy thông tin tài khoản đã đăng ký
      const storedUser = localStorage.getItem("registeredUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        // Kiểm tra email & mật khẩu
        if (user.email === data.email && user.password === data.password) {
          alert("Đăng nhập thành công!");
          
          // Lưu thông tin đăng nhập
          localStorage.setItem("user", JSON.stringify(user.fullName)); 

          setLoading(false);
          navigate("/"); // Chuyển hướng về trang chủ
        } else {
          alert("Email hoặc mật khẩu không chính xác!");
          setLoading(false);
        }
      } else {
        alert("Không tìm thấy tài khoản, vui lòng đăng ký!");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        {/* Thêm sự kiện onClick để khi bấm vào "✖" sẽ về trang chủ */}
        <span className="close-button" onClick={() => navigate("/")}>✖</span>
        
        <h2 className="auth-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
