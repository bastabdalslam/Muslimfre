import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NotificationSettings {
  morningEnabled: boolean;
  morningTime: string;
  eveningEnabled: boolean;
  eveningTime: string;
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  requestNotificationPermission: () => Promise<boolean>;
  hasPermission: boolean;
}

const defaultSettings: NotificationSettings = {
  morningEnabled: false,
  morningTime: '07:00',
  eveningEnabled: false,
  eveningTime: '16:00',
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const savedSettings = localStorage.getItem('notification-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('notification-settings', JSON.stringify(settings));
    
    // Check if we have permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
    
    // Set up notification timers when settings change
    setupNotificationTimers();
  }, [settings]);

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      setHasPermission(true);
      return true;
    }

    if (Notification.permission !== 'denied') {
      try {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setHasPermission(granted);
        return granted;
      } catch (e) {
        console.error('Error requesting notification permission:', e);
        return false;
      }
    }

    return false;
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const setupNotificationTimers = () => {
    // Only run this in browser environment
    if (typeof window === 'undefined') return;
    
    // Define timer property for TypeScript
    const win = window as any;
    
    // Clear any existing timers
    if (win.morningTimer) clearTimeout(win.morningTimer);
    if (win.eveningTimer) clearTimeout(win.eveningTimer);

    // Set up morning notification
    if (settings.morningEnabled && hasPermission && 'Notification' in window) {
      const morningTime = settings.morningTime.split(':');
      const morningHour = parseInt(morningTime[0]);
      const morningMinute = parseInt(morningTime[1]);
      
      const now = new Date();
      const morningDate = new Date();
      morningDate.setHours(morningHour, morningMinute, 0);
      
      // If time has already passed today, schedule for tomorrow
      if (now > morningDate) {
        morningDate.setDate(morningDate.getDate() + 1);
      }
      
      const morningDelay = morningDate.getTime() - now.getTime();
      
      win.morningTimer = setTimeout(() => {
        try {
          new Notification('أذكار الصباح', {
            body: 'حان وقت أذكار الصباح، لا تنسى ذكر الله',
            icon: '/favicon.svg'
          });
        } catch (e) {
          console.error('Error showing notification:', e);
        }
        
        // Reschedule for tomorrow
        setupNotificationTimers();
      }, morningDelay);
    }
    
    // Set up evening notification
    if (settings.eveningEnabled && hasPermission && 'Notification' in window) {
      const eveningTime = settings.eveningTime.split(':');
      const eveningHour = parseInt(eveningTime[0]);
      const eveningMinute = parseInt(eveningTime[1]);
      
      const now = new Date();
      const eveningDate = new Date();
      eveningDate.setHours(eveningHour, eveningMinute, 0);
      
      // If time has already passed today, schedule for tomorrow
      if (now > eveningDate) {
        eveningDate.setDate(eveningDate.getDate() + 1);
      }
      
      const eveningDelay = eveningDate.getTime() - now.getTime();
      
      win.eveningTimer = setTimeout(() => {
        try {
          new Notification('أذكار المساء', {
            body: 'حان وقت أذكار المساء، لا تنسى ذكر الله',
            icon: '/favicon.svg'
          });
        } catch (e) {
          console.error('Error showing notification:', e);
        }
        
        // Reschedule for tomorrow
        setupNotificationTimers();
      }, eveningDelay);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      settings, 
      updateSettings, 
      requestNotificationPermission,
      hasPermission
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
 