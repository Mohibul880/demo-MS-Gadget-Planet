// ==============================
// Admin Login Page
// ==============================
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api.js";
import { AdminContext } from "../context/AdminContext.jsx";
import logo from "../assets/logo.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAdmin } = useContext(AdminContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/login", formData);
      localStorage.setItem("msgp-admin-token", data.token);
      setAdmin(data.admin);
      toast.success("Login successful");
      navigate("/");
      window.location.reload();
    } catch (error) { toast.error(error.response?.data?.message || "Login failed"); }
  };

  return <div className="flex min-h-screen items-center justify-center bg-base-200 px-4"><div className="card w-full max-w-md bg-base-100 shadow-2xl"><div className="card-body"><div className="mb-4 flex flex-col items-center"><img src={logo} alt="Logo" className="h-20 w-20 rounded-full object-cover" /><h1 className="mt-3 text-2xl font-bold">MS Gadget Planet Admin</h1><p className="text-sm opacity-70">Login to control products and orders</p></div><form className="space-y-4" onSubmit={handleSubmit}><input className="input input-bordered w-full" type="email" placeholder="Admin email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /><input className="input input-bordered w-full" type="password" placeholder="Admin password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /><button className="btn btn-primary w-full">Login</button></form></div></div></div>;
};
export default LoginPage;
