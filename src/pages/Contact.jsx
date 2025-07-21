const Contact = () => {
  return (
    <section className="py-8 lg:py-28 px-5 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 className="text-3xl lg:text-5xl font-normal mb-3">Contact Us</h1>
          <h2 className="text-xl font-light mb-4">We are Here to Help</h2>
          <p className="text-gray-700 text-base mb-4">
            Have questions about products, orders, or returns? Our team is ready
            to assist you.
          </p>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Email:</strong> support@modernartfurnish.com
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Hours:</strong> Mon - Fri, 10am - 6pm IST
            </p>
            <p>
              <strong>Address:</strong> 24/7 Furnish Ave, Bengaluru, India
            </p>
            <p className="text-gray-500">We usually respond within 24 hours.</p>
          </div>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-900 text-white px-6 py-3 rounded-md hover:bg-yellow-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
