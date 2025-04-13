import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const savedSetting = localStorage.getItem('sound-enabled');
    return savedSetting ? JSON.parse(savedSetting) : true;
  });

  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Make sure this only runs in the browser
    if (typeof window !== 'undefined') {
      try {
        const click = new Audio('/sounds/click.mp3');
        const success = new Audio('/sounds/success.mp3');
        
        // Set audio objects only after they're loaded
        click.addEventListener('canplaythrough', () => {
          setClickSound(click);
        });
        
        success.addEventListener('canplaythrough', () => {
          setSuccessSound(success);
        });
        
        // Preload sounds
        click.load();
        success.load();
      } catch (err) {
        console.error('Error loading sound files:', err);
      }
    }
    
    localStorage.setItem('sound-enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playClickSound = () => {
    if (soundEnabled && clickSound) {
      try {
        // Create a clone to allow overlapping sounds
        const sound = clickSound.cloneNode() as HTMLAudioElement;
        sound.volume = 0.5;
        sound.play().catch(e => {
          console.error('Error playing click sound:', e);
        });
      } catch (err) {
        console.error('Error playing click sound:', err);
      }
    }
  };

  const playSuccessSound = () => {
    if (soundEnabled && successSound) {
      try {
        // Create a clone to allow overlapping sounds
        const sound = successSound.cloneNode() as HTMLAudioElement;
        sound.volume = 0.5;
        sound.play().catch(e => {
          console.error('Error playing success sound:', e);
        });
      } catch (err) {
        console.error('Error playing success sound:', err);
      }
    }
  };

  return (
    <SoundContext.Provider value={{ 
      soundEnabled, 
      toggleSound, 
      playClickSound, 
      playSuccessSound 
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
 