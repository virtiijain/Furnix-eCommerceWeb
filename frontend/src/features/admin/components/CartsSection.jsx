const CartsSection = ({ carts }) => {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-medium text-gray-800 mb-4 tracking-tight">
        Customer Carts
      </h2>

      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Items</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr
                key={cart._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {cart.userId?.name || "Unknown User"}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {cart.items.map((i) => i.productId?.name).join(", ") || "No items"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {carts.map((cart) => (
          <div
            key={cart._id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-500 mb-1">User</p>
            <p className="text-gray-800 font-medium mb-3">
              {cart.userId?.name || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500 mb-1">Items</p>
            <p className="text-gray-700 text-sm">
              {cart.items.map((i) => i.productId?.name).join(", ") || "No items"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartsSection;
