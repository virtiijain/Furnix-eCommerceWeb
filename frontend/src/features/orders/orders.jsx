import { useEffect, useState } from "react";
import OrderCard from "../orders/components/OrderCard";
import { API } from "../../api";

const BACKEND_URL = "https://furnix-ecommerceweb.onrender.com"; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUserId(user?._id);
  }, []);

  useEffect(() => {
  if (!userId) return;

  const fetchOrders = async () => {
    try {
      const res = await API.get(`/api/orders/${userId}`);
      if (res.data.success) {
        const ordersWithFullImages = res.data.orders.map(order => ({
          ...order,
          items: order.items.map(item => ({
            ...item,
            image: item.image.startsWith("http") ? item.image : `${BACKEND_URL}/${item.image}`
          }))
        }));
        setOrders(ordersWithFullImages);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  fetchOrders();
}, [userId]);

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-center sm:text-left">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 text-lg">
            No orders found yet
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
