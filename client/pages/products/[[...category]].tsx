import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Announcement from '../../components/Announcement';
import Products from '../../components/Products';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';

interface IFilters {
  color?: string;
  size?: string;
}

const ProductListPage = () => {
  // set title
  const [title, setTitle] = useState('Products');

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (!router.isReady || !category) {
      return;
    }
    const cat = category[0] as string;
    setTitle(cat[0].toUpperCase() + cat.slice(1));
  }, [router.isReady, category]);

  // set filters
  const [filters, setFilters] = useState<IFilters>({});

  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  };

  // set sort
  const [sort, setSort] = useState<string>('newest');

  return (
    <div className="productListPage-container">
      <Navbar />
      <Announcement />
      <h1>{title}</h1>
      <div className="productListPage-filterContainer">
        <div className="productListPage-filter">
          <span>Filter Products:</span>
          <select name="color" onChange={handleFilters}>
            <option disabled>Color</option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select name="size" onChange={handleFilters}>
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="productListPage-filter">
          <span>Sort Products:</span>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductListPage;
