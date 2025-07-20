import PropTypes from "prop-types";

const FilterBar = ({ onCategoryChange, selectedCategory }) => {
  const categories = ["All", "Chair", "Sofa", "Table", "Vase", "Lamp"];

  return (
    <section className="px-8 ">
      <h1 className="text-center font-normal text-3xl mt-5 pb-3">
        Top products
      </h1>
      <p className="text-center max-w-5xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        perspiciatis illum architecto, unde, tenetur cum quo quisquam vitae
        possimus aliquam culpa vero, reprehenderit magnam rerum quod dignissimos
        saepe? Vel, asperiores.
      </p>
      <div className="flex flex-wrap gap-2 p-4 justify-center items-center">
        {categories.map((name) => (
          <button
            key={name}
            onClick={() => onCategoryChange(name.toLowerCase())}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-300 ${
              selectedCategory === name.toLowerCase()
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
};

FilterBar.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default FilterBar;
