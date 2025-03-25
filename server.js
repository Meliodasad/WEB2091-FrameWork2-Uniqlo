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

// API đăng nhập
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

  const user = db.customers.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

  res.json({ message: "Đăng nhập thành công", user });
});

app.listen(3001, () => console.log("Server chạy trên http://localhost:3001"));
