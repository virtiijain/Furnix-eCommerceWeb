import PropTypes from "prop-types";

const ShopNow = ({
  title = "Visit Our Full Shop",
  description = "Browse through our wide range of curated furniture, lighting, and decor made for modern living.",
  link = "/shop",
  buttonText = "Go to Shop",
}) => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl lg:text-3xl font-normal mb-6">{title}</h2>
      <p className="text-gray-600 text-base max-w-xl mx-auto mb-6">
        {description}
      </p>
      <a
        href={link}
        className="inline-block text-sm font-normal bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
      >
        {buttonText}
      </a>
    </section>
  );
};

export default ShopNow;

ShopNow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  buttonText: PropTypes.string,
};
