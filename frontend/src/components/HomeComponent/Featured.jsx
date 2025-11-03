import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 6)); // only first 6 for featured
      } catch (err) {
        console.log("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="p-10 relative">
      <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4">
        Featured Collection
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Handpicked pieces specially selected for you.
      </p>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="[--swiper-navigation-color:#78350f] [--swiper-pagination-color:#78350f]"
        >
          {products.map((p, i) => (
            <SwiperSlide key={p._id || p.id || i}>
              <div className="border border-gray-400 rounded-lg p-5 text-center bg-white hover:shadow-md">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-md text-gray-700">{p.name}</h3>
                <Link to={`/product/${p._id || p.id}`}>
                  <button className="mt-3 text-xs lg:text-sm border rounded px-3 py-1 inline-flex items-center gap-1 hover:bg-gray-100">
                    Shop Now <IoIosArrowForward />
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Featured;
