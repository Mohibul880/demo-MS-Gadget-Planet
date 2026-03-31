// ==============================
// Dashboard Stats Cards
// ==============================
const StatsCards = ({ products, orders }) => {
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const cards = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Pending Orders", value: orders.filter((item) => item.status === "Pending").length },
    { label: "Total Sales", value: `$${totalSales.toFixed(2)}` },
  ];
  return <section id="stats" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <div key={card.label} className="rounded-3xl bg-base-100 p-5 shadow"><p className="text-sm opacity-70">{card.label}</p><h2 className="mt-2 text-3xl font-extrabold text-brand">{card.value}</h2></div>)}</section>;
};
export default StatsCards;
