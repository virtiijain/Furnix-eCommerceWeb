const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mb-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-medium mb-4">Furnix</h2>
          <nav className="space-y-2">
            <a href="/" className="text-sm hover:underline">
              Home
            </a>
            <span className="text-sm mx-1">/</span>
            <a href="/shop" className="text-sm hover:underline">
              Shop
            </a>
            <span className="text-sm mx-1">/</span>
            <a href="/contact" className="text-sm hover:underline">
            Contact
            </a>
          </nav>
        </div>
        <div>
          <h3 className="uppercase text-sm font-bold mb-1">Contact Us</h3>
          <p className="text-sm">+91 98765 43210</p>
          <a
            href="mailto:virtij29@gmail.com"
            className="text-sm hover:underline"
          >
            Furnix@gmail.com
          </a>
        </div>

        <div>
          <div className="mb-3">
            <h3 className="uppercase text-sm font-bold">Address</h3>
            <p className="text-sm">
            MG Road, Indiranagar,
            Bengaluru, Karnataka - 560038
            </p>
          </div>
          <div>
            <h3 className="uppercase text-sm font-bold">Opening Hours</h3>
            <p className="text-sm">9am—6pm</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-7 text-gray-400">
        <p className="text-center text-sm">
          &copy; 2025 All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
