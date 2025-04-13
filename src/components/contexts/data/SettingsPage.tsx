import  { Settings } from 'lucide-react';
import { useState } from 'react';
import { useFontSize } from '../contexts/FontSizeContext';
import FontSizeSelector from '../components/FontSizeSelector';
import NotificationsSettings from '../components/NotificationsSettings';
import SoundToggle from '../components/SoundToggle';
import { useCounter } from '../contexts/CounterContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSound } from '../contexts/SoundContext';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { resetAllCounts } = useCounter();
  const { favorites, toggleFavorite } = useFavorites();
  const { playClickSound, playSuccessSound } = useSound();
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showClearFavoritesConfirmation, setShowClearFavoritesConfirmation] = useState(false);

  const handleResetCounters = () => {
    playClickSound();
    resetAllCounts();
    setShowResetConfirmation(false);
    playSuccessSound();
    toast.success('تم إعادة ضبط جميع العدادات');
  };

  const handleClearFavorites = () => {
    playClickSound();
    // Remove all favorites one by one
    [...favorites].forEach(id => toggleFavorite(id));
    setShowClearFavoritesConfirmation(false);
    playSuccessSound();
    toast.success('تم مسح قائمة المفضلة');
  };

  const handleToggleConfirmationReset = () => {
    playClickSound();
    setShowResetConfirmation(prev => !prev);
  };

  const handleToggleConfirmationFavorites = () => {
    playClickSound();
    setShowClearFavoritesConfirmation(prev => !prev);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 ml-2 text-primary-600" />
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">خيارات العرض</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">حجم الخط</h3>
            <FontSizeSelector />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">إعدادات الصوت</h3>
            <SoundToggle />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">الإشعارات</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">تفعيل الإشعارات</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              يمكنك تفعيل الإشعارات للتذكير بأذكار الصباح والمساء في الأوقات المحددة
            </p>
            <NotificationsSettings />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 border-b pb-2 text-red-600 dark:text-red-400">خيارات متقدمة</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">إعادة ضبط العدادات</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              سيؤدي هذا إلى إعادة ضبط جميع العدادات إلى الصفر
            </p>
            
            {!showResetConfirmation ? (
              <button 
                onClick={handleToggleConfirmationReset}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                إعادة ضبط جميع العدادات
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="font-medium text-red-600 dark:text-red-400 mb-3">
                  هل أنت متأكد من إعادة ضبط جميع العدادات؟
                </p>
                <div className="flex space-x-3 space-x-reverse">
                  <button 
                    onClick={handleResetCounters}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    نعم، إعادة الضبط
                  </button>
                  <button 
                    onClick={handleToggleConfirmationReset}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">مسح قائمة المفضلة</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              سيؤدي هذا إلى حذف جميع الأذكار المحفوظة في المفضلة
            </p>
            
            {!showClearFavoritesConfirmation ? (
              <button 
                onClick={handleToggleConfirmationFavorites}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                disabled={favorites.length === 0}
              >
                مسح قائمة المفضلة
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="font-medium text-red-600 dark:text-red-400 mb-3">
                  هل أنت متأكد من مسح قائمة المفضلة؟
                </p>
                <div className="flex space-x-3 space-x-reverse">
                  <button 
                    onClick={handleClearFavorites}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    نعم، مسح القائمة
                  </button>
                  <button 
                    onClick={handleToggleConfirmationFavorites}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
 