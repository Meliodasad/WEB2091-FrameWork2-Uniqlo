import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

const dbFile = "./db.json";

// API lấy danh sách sản phẩm
app.get("/products", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  res.json(db.products);
});

// API lấy giỏ hàng của người dùng
app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  const cart = db.cart.find(c => c.id === userId);
  if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
  res.json(cart);
});

// API đăng nhập
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

  res.json({ message: "Đăng nhập thành công", user });
});

// API thanh toán và xóa giỏ hàng
app.post("/checkout", (req, res) => {
  const { userId, items, totalAmount, address, paymentMethod } = req.body;

  const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

  // Tạo đơn hàng
  const order = {
    id: new Date().toISOString(), // Tạo ID đơn hàng bằng thời gian
    userId,
    items,
    totalAmount,
    address,
    paymentMethod,
    status: "Chờ xử lý",
    createdAt: new Date().toISOString(),
  };

  // Thêm đơn hàng vào danh sách orders
  db.orders.push(order);

  // Xóa giỏ hàng của người dùng
  const userCartIndex = db.cart.findIndex(cart => cart.id === userId);
  if (userCartIndex !== -1) {
    db.cart.splice(userCartIndex, 1);
  }

  // Lưu lại các thay đổi vào db.json
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  res.status(200).json({
    message: "Đặt hàng thành công, giỏ hàng đã được xóa.",
    order,
  });
});

// Khởi động server
app.listen(3001, () => console.log("Server chạy trên http://localhost:3001"));
