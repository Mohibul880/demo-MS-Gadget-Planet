// ==============================
// Order Management Table
// ==============================
import toast from "react-hot-toast";
import api from "../../../services/api.js";
const statuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
const OrderTable = ({ orders, reload }) => {
  const handleStatusChange = async (id, status) => {
    try { await api.patch(`/orders/${id}/status`, { status }); toast.success("Order status updated"); reload(); } catch (error) { toast.error(error.response?.data?.message || "Status update failed"); }
  };
  return <section id="order-table" className="rounded-3xl bg-base-100 p-6 shadow"><div className="mb-4"><h2 className="text-2xl font-bold">Manage Orders</h2><p className="text-sm opacity-70">Track customer orders from the admin panel.</p></div><div className="overflow-x-auto"><table className="table"><thead><tr><th>Customer</th><th>Phone</th><th>Total</th><th>Items</th><th>Status</th><th>Address</th></tr></thead><tbody>{orders.map((order) => <tr key={order._id}><td>{order.customerName}</td><td>{order.phone}</td><td>${order.totalAmount}</td><td><div className="max-w-xs text-xs">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</div></td><td><select className="select select-bordered select-sm" value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td><td>{order.address}</td></tr>)}</tbody></table></div></section>;
};
export default OrderTable;
