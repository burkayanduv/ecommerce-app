import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Product from './Product';
import { IProduct } from '../shared/interfaces';

interface IProps {
  filters: {
    color?: string;
    size?: string;
  };
  sort?: string;
  limit?: number;
}

const defaultProps = {
  sort: 'newest',
  limit: undefined
};

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const Products = ({ filters, sort, limit }: IProps) => {
  // get location
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/products/${category ? `?category=${category[0]}` : ''}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [router.isReady, category]);

  useEffect(() => {
    if (!products.length) {
      return;
    }
    const filtered = products.filter((product) => {
      if (filters.color && filters.size) {
        return (
          product.color.includes(filters.color.toLowerCase()) &&
          product.size.includes(filters.size)
        );
      }
      if (filters.color) {
        return product.color.includes(filters.color.toLowerCase());
      }
      if (filters.size) {
        return product.size.includes(filters.size);
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [products, filters]);

  useEffect(() => {
    if (!filteredProducts.length) {
      return;
    }
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === 'desc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, filteredProducts.length]);

  return (
    <div className="products-container">
      {limit
        ? filteredProducts
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)
        : filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          ))}
    </div>
  );
};

Products.defaultProps = defaultProps;
export default Products;
