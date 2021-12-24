import { categories } from '../shared/constants/data';
import CategoryItem from './CategoryItem';

const Categories = () => (
  <div className="categories-container">
    {categories.map((item) => (
      <CategoryItem item={item} key={item.id} />
    ))}
  </div>
);

export default Categories;
