import { AlertCircle, Send } from "lucide-react";
import { useState } from "react";

const ReportIssueForm = () => {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!issue || !message) {
      alert("Please fill all fields");
      return;
    }
    alert("Your issue has been submitted");
    setIssue("");
    setMessage("");
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl mb-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <AlertCircle className="w-5 h-5 text-black" /> Report an Issue
      </h3>
      <select
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black mb-4"
      >
        <option value="">Select Issue Type</option>
        <option>Payment Problem</option>
        <option>Order Not Delivered</option>
        <option>App Bug / Error</option>
        <option>Account or Login Issue</option>
        <option>Other</option>
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        placeholder="Describe your issue..."
        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
      ></textarea>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-yellow-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-yellow-800 transition"
      >
        <Send className="w-5 h-5" /> Submit Issue
      </button>
    </div>
  );
};

export default ReportIssueForm;
