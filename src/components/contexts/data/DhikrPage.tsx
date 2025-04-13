import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { adhkar } from '../data/adhkar';
import { categories } from '../data/categories';
import Counter from '../components/Counter';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { useFontSize } from '../contexts/FontSizeContext';
import { useSound } from '../contexts/SoundContext';
import { toast } from 'react-toastify';

const DhikrPage = () => {
  const { id } = useParams<{ id: string }>();
  const [dhikr, setDhikr] = useState(adhkar.find(d => d.id === Number(id)));
  const [category, setCategory] = useState(dhikr ? categories.find(c => c.id === dhikr.categoryId) : null);
  const [copied, setCopied] = useState(false);
  const { fontSize } = useFontSize();
  const { playClickSound, playSuccessSound } = useSound();
  
  useEffect(() => {
    const currentDhikr = adhkar.find(d => d.id === Number(id));
    setDhikr(currentDhikr);
    if (currentDhikr) {
      setCategory(categories.find(c => c.id === currentDhikr.categoryId));
    }
  }, [id]);

  const handleCopy = () => {
    playClickSound();
    if (dhikr) {
      try {
        // Create a temporary textarea element
        const tempInput = document.createElement('textarea');
        tempInput.value = dhikr.content;
        
        // Add to document
        document.body.appendChild(tempInput);
        
        // Select the text
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        
        // Use document.execCommand as a fallback
        document.execCommand('copy');
        
        // Remove the input element
        document.body.removeChild(tempInput);
        
        playSuccessSound();
        setCopied(true);
        toast.success('تم نسخ النص');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        toast.error('فشل في نسخ النص');
      }
    }
  };

  if (!dhikr || !category) {
    return <div className="text-center py-8">الذكر غير موجود</div>;
  }

  // Determine the font size class
  const fontSizeClass = 
    fontSize === 'small' ? 'text-base' : 
    fontSize === 'large' ? 'text-2xl' : 
    'text-lg';

  return (
    <div>
      <div className="flex items-center mb-2">
        <Link to="/" className="flex items-center text-primary-600 hover:text-primary-700">
          <ArrowRight className="h-5 w-5 ml-1" />
          <span>الرئيسية</span>
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/category/${category.id}`} className="text-primary-600 hover:text-primary-700">
          {category.title}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium truncate">{dhikr.title}</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{dhikr.title}</h1>
          <FavoriteButton dhikrId={dhikr.id} />
        </div>
        
        <div className="my-6">
          <pre className={`whitespace-pre-wrap ${fontSizeClass} arabic-text`}>
            {dhikr.content}
          </pre>
        </div>
        
        {dhikr.translation && (
          <div className="my-4 p-3 bg-gray-50 dark:bg-gray-700 rounded border-r-4 border-primary-500">
            <h3 className="font-semibold mb-1">المعنى:</h3>
            <p>{dhikr.translation}</p>
          </div>
        )}
        
        {dhikr.benefit && (
          <div className="my-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border-r-4 border-green-500">
            <h3 className="font-semibold mb-1">الفضل:</h3>
            <p>{dhikr.benefit}</p>
          </div>
        )}
        
        {dhikr.source && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            <span className="font-semibold">المصدر:</span> {dhikr.source}
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2 space-x-reverse">
            <button 
              onClick={handleCopy}
              className="flex items-center space-x-1 space-x-reverse px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            </button>
            
            <ShareButton text={dhikr.content} title={dhikr.title} />
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {dhikr.count} مرات
            </span>
          </div>
        </div>
      </div>
      
      <Counter dhikrId={dhikr.id} maxCount={dhikr.count} />
    </div>
  );
};

export default DhikrPage;
 