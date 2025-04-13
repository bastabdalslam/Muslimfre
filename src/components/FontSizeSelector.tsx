import  { Type } from 'lucide-react';
import { useFontSize } from '../contexts/FontSizeContext';

const FontSizeSelector = () => {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <Type className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <button 
          onClick={() => setFontSize('small')}
          className={`px-2 py-1 text-sm rounded ${
            fontSize === 'small' 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          صغير
        </button>
        <button 
          onClick={() => setFontSize('medium')}
          className={`px-2 py-1 text-sm rounded ${
            fontSize === 'medium' 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          متوسط
        </button>
        <button 
          onClick={() => setFontSize('large')}
          className={`px-2 py-1 text-sm rounded ${
            fontSize === 'large' 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          كبير
        </button>
      </div>
    </div>
  );
};

export default FontSizeSelector;
 