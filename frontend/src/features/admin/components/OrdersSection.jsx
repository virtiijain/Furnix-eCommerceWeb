const OrdersSection = ({ orders }) => {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-medium text-gray-800 mb-4 tracking-tight">Orders Overview</h2>

      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-sm">{order._id}</td>
                <td className="py-3 px-4 text-sm">{order.userId?.name}</td>
                <td className="py-3 px-4 text-sm">
                  ₹
                  {order.items.reduce(
                    (sum, item) =>
                      sum + (item.productId?.price || 0) * item.quantity,
                    0
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Order ID:
              </span>
              <span className="text-gray-800 text-sm font-semibold">
                {order._id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm font-medium">User:</span>
              <span className="text-gray-800 text-sm font-semibold">
                {order.userId?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm font-medium">Total:</span>
              <span className="text-gray-800 text-sm font-semibold">
                ₹
                {order.items.reduce(
                  (sum, item) =>
                    sum + (item.productId?.price || 0) * item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">
                Status:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
