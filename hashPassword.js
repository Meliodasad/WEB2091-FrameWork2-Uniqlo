import bcrypt from "bcryptjs";

const password = "987654321"; // Mật khẩu gốc của user
const hashedPassword = await bcrypt.hash(password, 10);

console.log("Mật khẩu đã mã hóa:", hashedPassword);
