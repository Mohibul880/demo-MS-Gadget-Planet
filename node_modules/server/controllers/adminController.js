// ==============================
// Admin Authentication Controller
// ==============================
import { createToken } from "../utils/createToken.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({
      message: "Login successful",
      token: createToken({ role: "admin", email }),
      admin: { email, role: "admin" }
    });
  }
  return res.status(401).json({ message: "Invalid email or password" });
};
