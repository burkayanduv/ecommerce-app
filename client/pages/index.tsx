import type { NextPage } from 'next';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home: NextPage = () => (
  <>
    <Announcement />
    <Navbar />
    <Slider />
    <Categories />
    <Products filters={{}} limit={8} />
    <Newsletter />
    <Footer />
  </>
);

export default Home;