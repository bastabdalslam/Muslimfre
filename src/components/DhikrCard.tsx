import  { Link } from 'react-router-dom';
import { Dhikr } from '../data/adhkar';

interface DhikrCardProps {
  dhikr: Dhikr;
}

const DhikrCard = ({ dhikr }: DhikrCardProps) => {
  return (
    <Link to={`/dhikr/${dhikr.id}`} className="block no-underline">
      <div className="card text-right">
        <h3 className="text-xl font-bold text-primary-800 mb-2">{dhikr.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 arabic-text">{dhikr.content}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {dhikr.count} مرات
          </span>
          <span className="text-primary-600 hover:text-primary-700">عرض &larr;</span>
        </div>
      </div>
    </Link>
  );
};

export default DhikrCard;
 