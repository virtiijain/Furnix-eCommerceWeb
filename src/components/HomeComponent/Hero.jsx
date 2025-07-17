import img1 from "../../assets/img1.png"

const Hero = () => {
  return (
    <div id="home" className="flex flex-col items-center justify-center mt-8 py-10 px-5 md:px-20">
      {/* Top Text section */}
      <div className="text-center">
        <h1 className="text-sm font-normal text-gray-600 tracking-wider mb-5">
          FURNITURE STORE
        </h1>
        <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 leading-tight mb-5">
          Discover the Artistry of Modern Contemporary Furniture
        </h2>
        <p className=" text-gray-600 text-lg px-5 mb-3">
          Experience the elegance and functionality of cutting-edge design where
          luxury meets innovation in every piece for ultimate relaxation
        </p>
      </div>

      {/* Hero Image section */}
      <div className="w-full max-w-4xl mt-8 ">
        <img src={img1}
          className="object-cover rounded-2xl shadow-lg w-full mb-14"
        />
      </div>
    </div>
  );
};

export default Hero;