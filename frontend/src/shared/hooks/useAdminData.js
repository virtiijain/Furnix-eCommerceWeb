import { useEffect, useState } from "react";
import axios from "axios";

export const useAdminData = (setNotification) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token");

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [usersRes, ordersRes, productsRes, cartsRes] = await Promise.all([
          axios.get("http://localhost:5500/api/admin/users", config),
          axios.get("http://localhost:5500/api/admin/orders", config),
          axios.get("http://localhost:5500/api/admin/products", config),
          axios.get("http://localhost:5500/api/admin/carts", config),
        ]);

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setCarts(cartsRes.data);
      } catch (err) {
        console.error(err);
        setNotification({
          message: "Error fetching admin data",
          type: "error",
        });
      }
    };
    fetchData();
  }, [setNotification]);

  return {
    users,
    setUsers,
    orders,
    setOrders,
    products,
    setProducts,
    carts,
    setCarts,
  };
};
