const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  const contactInfo = {
    phone: "+91 98765 43210",
    email: "Furnix@gmail.com",
  };

  const address = "MG Road, Indiranagar, Bengaluru, Karnataka - 560038";
  const hours = "9am—6pm";

  return (
    <footer className="bg-black text-white py-10 mb-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-medium mb-4">Furnix</h2>
          <nav className="space-x-1 text-sm">
            {navLinks.map((link, idx) => (
              <span key={link.name}>
                <a href={link.href} className="hover:underline">{link.name}</a>
                {idx < navLinks.length - 1 && <span className="mx-1">/</span>}
              </span>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="uppercase text-sm font-bold mb-1">Contact Us</h3>
          <p className="text-sm">{contactInfo.phone}</p>
          <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
            {contactInfo.email}
          </a>
        </div>

        <div>
          <div className="mb-3">
            <h3 className="uppercase text-sm font-bold">Address</h3>
            <p className="text-sm">{address}</p>
          </div>
          <div>
            <h3 className="uppercase text-sm font-bold">Opening Hours</h3>
            <p className="text-sm">{hours}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-7 text-gray-400">
        <p className="text-center text-sm">&copy; 2025 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
