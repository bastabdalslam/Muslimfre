import  { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { adhkar } from '../data/adhkar';
import DhikrCard from '../components/DhikrCard';
import SearchBar from '../components/SearchBar';
import { BookMarked } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  
  const favoriteDhikrs = adhkar.filter(dhikr => favorites.includes(dhikr.id));
  
  const filteredFavorites = favoriteDhikrs.filter(dhikr => 
    dhikr.title.includes(searchQuery) || 
    dhikr.content.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex items-center mb-6">
        <BookMarked className="h-6 w-6 ml-2 text-primary-600" />
        <h1 className="text-2xl font-bold">الأذكار المفضلة</h1>
      </div>
      
      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder="ابحث في المفضلة..." 
      />
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl inline-block mb-4">
            <BookMarked className="h-12 w-12 mx-auto text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">لا توجد أذكار مفضلة</h3>
          <p className="text-gray-500 dark:text-gray-400">
            أضف أذكارك المفضلة بالضغط على علامة النجمة في صفحة الذكر
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((dhikr) => (
            <DhikrCard key={dhikr.id} dhikr={dhikr} />
          ))}
        </div>
      )}
      
      {favorites.length > 0 && filteredFavorites.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد أذكار تطابق البحث
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
 