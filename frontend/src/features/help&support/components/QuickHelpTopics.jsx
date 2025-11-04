const QuickHelpTopics = () => {
  const topics = [
    "Payment & Refunds",
    "Order & Delivery",
    "Account Settings",
    "Security & Privacy",
    "App Performance",
    "Feedback & Suggestions",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Help Topics
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <button
            key={i}
            className="border p-4 rounded-xl text-gray-700 font-medium hover:bg-yellow-900 hover:text-white transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickHelpTopics;
