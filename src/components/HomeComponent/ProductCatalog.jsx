import img2 from "../../assets/img2.png"
import img3 from "../../assets/img3.png"
import img4 from "../../assets/img4.png"
import img5 from "../../assets/img5.png"

const ProductCatalog = () => {
  return (
    <div id="categories" className="p-5 md:p-5 lg:p-10">
      <h2 className=" text-2xl lg:text-3xl font-normal mb-2 text-gray-800">
        Categories
      </h2>
      <p className="mb-5 max-w-7xl text-sm">Lorem, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias perferendis omnis ad facere mollitia officiis iusto doloribus nulla reiciendis modi. ipsum dolor sit amet consectetur adipisicing elit. Quaerat at itaque distinctio placeat error assumenda fugiat voluptas nobis alias vitae eum, eos deleniti odio deserunt ut inventore repellendus, corrupti ducimus.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Sitting Room */}
        <div className=" bg-secondary rounded-lg p-6 flex flex-col justify-between items-center text-center">
          <img
            src={img2} 
            alt="Accessories"
            className="w-full md:w-1/3 md:mb-0 md:mr-4 h-32 object-contain mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Sitting Room</h3>
          <button className="mt-4 py-2 px-6 text-sm text-gray-800 border rounded-lg hover:bg-gray-200 transition hidden md:block">
            Shop Now &rarr;
          </button>
        </div>

        {/* Accessories */}
        <div className=" bg-secondary rounded-lg shadow-sm p-6 flex flex-col justify-between items-center text-center">
          <img
            src={img3} 
            alt="Accessories"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Accessories</h3>
          <button className="mt-4 py-2 px-6 text-sm text-gray-800 border rounded-lg hover:bg-gray-200 transition hidden md:block">
            Shop Now &rarr;
          </button>
        </div>

        {/* Kitchen */}
        <div className=" bg-secondary rounded-lg shadow-sm p-6 flex flex-col justify-between items-center text-center">
          <img
            src={img4} 
            alt="Kitchen"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Kitchen</h3>
          <button className="mt-4 py-2 px-6 text-sm text-gray-800 border rounded-lg hover:bg-gray-200 transition hidden md:block">
            Shop Now &rarr;
          </button>
        </div>

        {/* Bedroom */}
        <div className="bg-secondary rounded-lg shadow-sm p-6 flex flex-col justify-between items-center text-center">
          <img
            src={img5} 
            alt="Accessories"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Bedroom</h3>
          <button className="mt-4 py-2 px-6 text-sm text-gray-800 border rounded-lg hover:bg-gray-200 transition hidden md:block">
            Shop Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;