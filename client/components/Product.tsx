import Image from 'next/image';
import Link from 'next/link';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@material-ui/icons';

interface IProps {
  item: {
    _id: string;
    img: string;
  };
}

const Product = ({ item }: IProps) => (
  <div className="product-container">
    <div className="product-circle" />
    <Image
      className="product-image"
      src={item.img}
      layout="fill"
      objectFit="contain"
      alt={`product-${item._id}`}
    />
    <div className="product-info">
      <div className="product-icon">
        <ShoppingCartOutlined />
      </div>
      <Link href={`/product/${encodeURIComponent(item._id)}`} passHref>
        <div className="product-icon">
          <SearchOutlined />
        </div>
      </Link>
      <div className="product-icon">
        <FavoriteBorderOutlined />
      </div>
    </div>
  </div>
);

export default Product;
