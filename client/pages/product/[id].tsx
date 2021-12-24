import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Add, Remove } from '@material-ui/icons';
import Announcement from '../../components/Announcement';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Newsletter from '../../components/Newsletter';
import { publicRequest } from '../../shared/functions/requestMethods';
import { IProduct } from '../../shared/interfaces';
import { addProduct } from '../../redux/cartSlice';

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const dispatch = useDispatch();

  // get id from url
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || !id) {
      return;
    }
    const productId = id as string;

    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [router.isReady, id]);

  const handleClick = () => {
    if (!product) {
      return;
    }
    dispatch(
      addProduct({
        ...product,
        quantity,
        color: [color],
        size: [size]
      })
    );
  };

  return (
    <div className="productPage-container">
      <Navbar />
      <Announcement />
      {product && (
        <div className="productPage-wrapper">
          <div className="productPage-imageWrapper">
            <div className="productPage-imageContainer">
              <Image
                src={product.img}
                layout="fill"
                objectFit="contain"
                alt="product"
              />
            </div>
          </div>
          <div className="productPage-infoContainer">
            <h1>{product.title}</h1>
            <p>{product.desc}</p>
            <span>$ {product.price}</span>
            <div className="productPage-filterContainer">
              <div className="productPage-filter">
                <span>Color</span>
                {product.color.map((c) => (
                  <div
                    key={c}
                    className="productPage-filterColor"
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
              <div className="productPage-filter">
                <span>Size</span>
                <select onChange={(e) => setSize(e.target.value)}>
                  {product.size.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="productPage-addContainer">
              <div className="productPage-amountContainer">
                <Remove
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                  style={{ cursor: 'pointer' }}
                />
                <span>{quantity}</span>
                <Add
                  onClick={() => setQuantity((q) => (q < 100 ? q + 1 : q))}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <button type="button" onClick={handleClick}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductPage;
