import { MessageCircle, Mail, Headphones } from "lucide-react";

const SupportOptions = () => {
  const options = [
    {
      icon: <MessageCircle className="w-7 h-7 mx-auto text-black mb-2" />,
      title: "Live Chat",
      desc: "Chat with our support team instantly.",
    },
    {
      icon: <Mail className="w-7 h-7 mx-auto text-black mb-2" />,
      title: "Email Support",
      desc: "support@yourapp.com",
    },
    {
      icon: <Headphones className="w-7 h-7 mx-auto text-black mb-2" />,
      title: "Call Support",
      desc: "+91 98765 43210",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6 mb-10">
      {options.map((item, i) => (
        <div
          key={i}
          className="p-6 border rounded-xl text-center hover:shadow-md transition bg-gray-50 hover:bg-gray-100"
        >
          {item.icon}
          <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default SupportOptions;
