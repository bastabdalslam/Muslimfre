import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';
import { adhkar } from '../data/adhkar';
import DhikrCard from '../components/DhikrCard';
import SearchBar from '../components/SearchBar';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(categories.find(c => c.id === Number(id)));
  const [dhikrList, setDhikrList] = useState(adhkar.filter(d => d.categoryId === Number(id)));
  
  useEffect(() => {
    setCategory(categories.find(c => c.id === Number(id)));
    setDhikrList(adhkar.filter(d => d.categoryId === Number(id)));
  }, [id]);
  
  const filteredDhikrList = dhikrList.filter(dhikr => 
    dhikr.title.includes(searchQuery) || 
    dhikr.content.includes(searchQuery)
  );

  if (!category) {
    return <div className="text-center py-8">تصنيف غير موجود</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-primary-600 hover:text-primary-700">
          <ArrowRight className="h-5 w-5 ml-1" />
          <span>الرئيسية</span>
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <h1 className="text-2xl font-bold">{category.title}</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">{category.description}</p>
      
      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder="ابحث في الأذكار..." 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDhikrList.map((dhikr) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
      </div>
      
      {filteredDhikrList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد أذكار تطابق البحث
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
 