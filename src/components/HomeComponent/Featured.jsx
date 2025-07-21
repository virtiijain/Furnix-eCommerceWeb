import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import { IoIosArrowForward } from "react-icons/io";

const Featured = () => {
  return (
    <section className="p-10">
      <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4">
        Featured Collection
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Handpicked pieces specially selected for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-black rounded-lg p-5 text-center">
          <img
            src={img2}
            alt="Featured"
            className="w-full h-40 object-contain mb-3"
          />
          <h3 className="text-lg text-gray-700">Elegant Sofa Set</h3>
          <button className="items-center inline-flex gap-1 mt-3 text-sm px-4 py-2 border rounded hover:bg-gray-100 transition">
            Shop Now <IoIosArrowForward />
          </button>
        </div>

        <div className="border border-black rounded-lg p-5 text-center">
          <img
            src={img3}
            alt="Featured"
            className="w-full h-40 object-contain mb-3"
          />
          <h3 className="text-lg text-gray-700">Modern Home Decor</h3>
          <button className="items-center inline-flex gap-1 mt-3 text-sm px-4 py-2 border rounded hover:bg-gray-100 transition">
            Shop Now <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
