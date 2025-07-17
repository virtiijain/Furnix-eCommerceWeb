import { Link } from 'react-router-dom';

const FilterBar = () => {
  const categories = [
    { name: 'All', path: '/shop' },
    { name: 'Chair', path: '/shop/chair' },
    { name: 'Sofa', path: '/shop/sofa' },
    { name: 'Table', path: '/shop/table' },
    { name: 'Vase', path: '/shop/vase' }
  ];

  return (
    <section className='px-8 '>
      <h1 className='text-center font-normal text-3xl mt-5 pb-3'>Top products</h1>
      <p className='text-center max-w-5xl mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas perspiciatis illum architecto, unde, tenetur cum quo quisquam vitae possimus aliquam culpa vero, reprehenderit magnam rerum quod dignissimos saepe? Vel, asperiores.</p>
      <div className="flex flex-wrap gap-2 p-4 justify-center items-center">
      {categories.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          className="px-4 py-2 rounded-full text-sm font-medium border transition duration-300 hover:bg-black hover:text-white bg-white text-black"
        >
          {name}
        </Link>
      ))}
    </div>
    </section>
  );
};

export default FilterBar;
