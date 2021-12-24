import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  item: {
    id: number;
    img: string;
    title: string;
    cat: string;
  };
}

const CategoryItem = ({ item }: IProps) => (
  <div className="categoryItem-container">
    <div className="categoryItem-imageContainer">
      <Image src={item.img} layout="fill" objectFit="cover" alt={item.title} />
    </div>
    <div className="categoryItem-info">
      <h1>{item.title}</h1>
      <Link href={`/products/${item.cat}`} passHref>
        <button type="button">SHOP NOW</button>
      </Link>
    </div>
  </div>
);

export default CategoryItem;
