import  { useState } from 'react';
import { categories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category => 
    category.title.includes(searchQuery) || 
    category.description.includes(searchQuery)
  );

  return (
    <div>
      <HeroSection />
      
      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder="ابحث عن تصنيف..." 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
 