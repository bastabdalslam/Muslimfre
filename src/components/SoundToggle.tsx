import  { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const SoundToggle = () => {
  const { soundEnabled, toggleSound, playClickSound } = useSound();

  const handleToggleSound = () => {
    playClickSound(); // Play sound before toggling off
    toggleSound();
  };

  return (
    <button
      onClick={handleToggleSound}
      className="flex items-center space-x-2 space-x-reverse py-2 px-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
      aria-label={soundEnabled ? 'إيقاف الصوت' : 'تفعيل الصوت'}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="h-5 w-5 mr-1" />
          <span>الصوت مفعل</span>
        </>
      ) : (
        <>
          <VolumeX className="h-5 w-5 mr-1" />
          <span>الصوت متوقف</span>
        </>
      )}
    </button>
  );
};

export default SoundToggle;
 