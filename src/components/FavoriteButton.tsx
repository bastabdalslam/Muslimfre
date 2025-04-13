import  { Star } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSound } from '../contexts/SoundContext';

interface FavoriteButtonProps {
  dhikrId: number;
}

const FavoriteButton = ({ dhikrId }: FavoriteButtonProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { playClickSound, playSuccessSound } = useSound();
  const isFavorite = favorites.includes(dhikrId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      playClickSound();
    } else {
      playSuccessSound();
    }
    
    toggleFavorite(dhikrId);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
      }`}
      aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
    >
      <Star className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
};

export default FavoriteButton;
 