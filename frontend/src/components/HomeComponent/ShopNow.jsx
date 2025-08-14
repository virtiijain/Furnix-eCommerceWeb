const ShopNow = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl lg:text-3xl font-normal mb-6">
        Visit Our Full Shop
      </h2>
      <p className="text-gray-600 text-base max-w-xl mx-auto mb-6">
        Browse through our wide range of curated furniture, lighting, and decor
        made for modern living.
      </p>
      <a
        href="/shop"
        className="inline-block text-sm font-normal bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
      >
        Go to Shop
      </a>
    </section>
  );
};

export default ShopNow;
