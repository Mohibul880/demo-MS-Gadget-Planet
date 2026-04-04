// ==============================
// Dashboard Page
// ==============================
import { useEffect, useState } from "react";
import api from "../services/api.js";
import StatsCards from "../components/dashboard/StatsCards/StatsCards.jsx";
import HeroSettingsForm from "../components/hero/HeroSettingsForm.jsx";
import ProductForm from "../components/products/ProductForm/ProductForm.jsx";
import ProductTable from "../components/products/ProductTable/ProductTable.jsx";
import OrderTable from "../components/orders/OrderTable/OrderTable.jsx";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const loadData = async () => {
    const [productsRes, ordersRes] = await Promise.all([
      api.get("/products"),
      api.get("/orders"),
    ]);

    setProducts(productsRes.data);
    setOrders(ordersRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <StatsCards products={products} orders={orders} />
      <HeroSettingsForm />
      <ProductForm
        reload={loadData}
        editItem={editItem}
        setEditItem={setEditItem}
      />
      <ProductTable
        products={products}
        reload={loadData}
        setEditItem={setEditItem}
      />
      <OrderTable orders={orders} reload={loadData} />
    </div>
  );
};

export default DashboardPage;