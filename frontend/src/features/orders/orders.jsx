import { useEffect, useState } from "react";
import OrderCard from "../orders/components/OrderCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUserId(user?._id);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/orders/${userId}`);
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No orders found yet</p>
        ) : (
          <div className="space-y-5">
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
