// ==============================
// Admin Sidebar
// ==============================
import logo from "../../../assets/logo.jpg";
const AdminSidebar = () => <aside className="min-h-full w-72 bg-neutral p-6 text-neutral-content"><div className="mb-8 flex items-center gap-3"><img src={logo} alt="MS Gadget Planet" className="h-14 w-14 rounded-full object-cover" /><div><h2 className="text-lg font-bold">MS Gadget Planet</h2><p className="text-xs opacity-70">Admin Panel</p></div></div><ul className="menu gap-2"><li><a href="#stats">Dashboard</a></li><li><a href="#product-form">Add Product</a></li><li><a href="#product-table">Manage Products</a></li><li><a href="#order-table">Manage Orders</a></li></ul></aside>;
export default AdminSidebar;
