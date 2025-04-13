import  { Bell } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

const NotificationsSettings = () => {
  const { 
    settings, 
    updateSettings, 
    requestNotificationPermission,
    hasPermission
  } = useNotifications();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTogglePermission = async () => {
    if (!hasPermission) {
      try {
        const granted = await requestNotificationPermission();
        if (granted) {
          toast.success('تم تفعيل الإشعارات بنجاح');
          setIsDialogOpen(true);
        } else {
          toast.error('لم يتم السماح بالإشعارات. يرجى تغيير إعدادات المتصفح للسماح بالإشعارات');
        }
      } catch (e) {
        console.error('Error requesting notification permission:', e);
        toast.error('حدث خطأ أثناء طلب إذن الإشعارات');
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <button 
        onClick={handleTogglePermission}
        className="flex items-center space-x-2 space-x-reverse py-2 px-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
      >
        <Bell className="h-5 w-5 mr-1" />
        <span>الإشعارات</span>
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">إعدادات الإشعارات</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="ml-2">تفعيل إشعارات أذكار الصباح</span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.morningEnabled}
                    onChange={e => updateSettings({ morningEnabled: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {settings.morningEnabled && (
                <div>
                  <label className="block mb-2 text-sm font-medium">وقت التذكير بأذكار الصباح</label>
                  <input 
                    type="time" 
                    value={settings.morningTime}
                    onChange={e => updateSettings({ morningTime: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="ml-2">تفعيل إشعارات أذكار المساء</span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.eveningEnabled}
                    onChange={e => updateSettings({ eveningEnabled: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {settings.eveningEnabled && (
                <div>
                  <label className="block mb-2 text-sm font-medium">وقت التذكير بأذكار المساء</label>
                  <input 
                    type="time" 
                    value={settings.eveningTime}
                    onChange={e => updateSettings({ eveningTime: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                حفظ
              </button>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsSettings;
 