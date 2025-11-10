import PropTypes from "prop-types";

const Analytics = ({ users, orders, products }) => {
  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, i) => itemSum + (i.productId?.price || 0) * i.quantity,
        0
      ),
    0
  );

  return (
    <div className="mb-8 px-3 sm:px-4">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-5 tracking-tight">
        Dashboard Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Users"
          value={users.length}
          color="from-blue-100 to-blue-50"
          textColor="text-blue-700"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          color="from-green-100 to-green-50"
          textColor="text-green-700"
        />
        <StatCard
          title="Products"
          value={products.length}
          color="from-yellow-100 to-yellow-50"
          textColor="text-yellow-700"
        />
        <StatCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          color="from-purple-100 to-purple-50"
          textColor="text-purple-700"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, textColor }) => (
  <div
    className={`bg-gradient-to-br ${color} p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-1`}
  >
    <p className={`text-sm font-medium ${textColor} mb-1`}>{title}</p>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</h3>
  </div>
);

Analytics.propTypes = {
  users: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default Analytics;
