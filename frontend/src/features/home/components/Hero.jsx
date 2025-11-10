import img1 from "../../../assets/img1.png";

const Hero = () => {
  return (
    <header
      id="home"
      className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-8 gap-12"
    >
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-sm font-medium text-yellow-800 tracking-widest mb-4">
          FURNITURE STORE
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight mb-6">
          Discover the Artistry of <br className="hidden md:block" />
          Modern Contemporary Furniture
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
          Experience the elegance and functionality of cutting-edge design,
          where luxury meets innovation in every piece designed for comfort and
          style.
        </p>
        <a
          href="/shop"
          className="bg-yellow-900 text-white px-6 py-3 text-sm rounded-md hover:bg-yellow-800 transition duration-300"
        >
          Shop Now
        </a>
      </div>

      <div className="w-full lg:w-1/2 hidden md:block">
        <img
          src={img1}
          alt="Furniture"
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
    </header>
  );
};

export default Hero;
