import  { useState } from 'react';
import { Share, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSound } from '../contexts/SoundContext';

interface ShareButtonProps {
  text: string;
  title: string;
}

const ShareButton = ({ text, title }: ShareButtonProps) => {
  const [isShared, setIsShared] = useState(false);
  const { playClickSound, playSuccessSound } = useSound();

  const handleShare = async () => {
    playClickSound();
    const shareData = {
      title: 'حصن المسلم - ' + title,
      text: text,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share(shareData);
        playSuccessSound();
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } else {
        // Create a temporary input element
        const tempInput = document.createElement('textarea');
        tempInput.value = `${title}\n\n${text}\n\nمشاركة من تطبيق حصن المسلم\n${window.location.href}`;
        
        // Add to document
        document.body.appendChild(tempInput);
        
        // Select the text
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
          // Use document.execCommand as a fallback
          document.execCommand('copy');
          playSuccessSound();
          toast.success('تم نسخ النص. يمكنك مشاركته الآن!');
          setIsShared(true);
          setTimeout(() => setIsShared(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          toast.error('فشل في نسخ النص');
        }
        
        // Remove the input element
        document.body.removeChild(tempInput);
      }
    } catch (err) {
      console.error('Failed to share text: ', err);
      toast.error('فشل في مشاركة النص');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-1 space-x-reverse px-4 py-2 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-700/40 transition-colors"
    >
      <span>{isShared ? 'تم المشاركة' : 'مشاركة'}</span>
      {isShared ? <Check className="h-4 w-4 mr-1" /> : <Share className="h-4 w-4 mr-1" />}
    </button>
  );
};

export default ShareButton;
 