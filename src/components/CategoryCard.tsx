import  { Link } from 'react-router-dom';
import { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Generate a URL for a relevant image based on category id
  const getCategoryImage = (categoryId: number) => {
    const images = [
      "https://images.unsplash.com/photo-1601191362988-ac6ebec629c8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300",
      "https://images.unsplash.com/photo-1572358899655-f63ece97bfa5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300",
      "https://images.unsplash.com/photo-1587893905384-a7e56f8a41d8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300",
      "https://images.unsplash.com/photo-1535117423468-de0ff056882e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300", 
      "https://images.unsplash.com/photo-1575682631529-7d47334f022f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300",
      "https://images.unsplash.com/photo-1587893905384-a7e56f8a41d8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3&fit=crop&h=150&w=300"
    ];
    
    return images[categoryId % images.length];
  };

  return (
    <Link to={`/category/${category.id}`} className="block no-underline">
      <div className="card text-right overflow-hidden">
        <div className="h-32 -mx-6 -mt-6 mb-4 overflow-hidden">
          <img 
            src={getCategoryImage(category.id)} 
            alt={category.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold text-primary-800 mb-2">{category.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {category.count} أذكار
          </span>
          <span className="text-primary-600 hover:text-primary-700">عرض &larr;</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
 