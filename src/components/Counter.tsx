import  { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useCounter } from '../contexts/CounterContext';
import { useSound } from '../contexts/SoundContext';

interface CounterProps {
  dhikrId: number;
  maxCount: number;
}

const Counter = ({ dhikrId, maxCount }: CounterProps) => {
  const { counts, incrementCount, resetCount } = useCounter();
  const { playClickSound, playSuccessSound } = useSound();
  const count = counts[dhikrId] || 0;
  const [showAnimation, setShowAnimation] = useState(false);
  
  const handleIncrement = () => {
    if (count < maxCount) {
      playClickSound();
      incrementCount(dhikrId);
      setShowAnimation(true);
      
      // Play success sound when count reaches max
      if (count + 1 >= maxCount) {
        setTimeout(() => {
          playSuccessSound();
        }, 300);
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    resetCount(dhikrId);
  };

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShowAnimation(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const progress = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative mb-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 space-x-reverse">
        <button 
          onClick={handleReset}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          aria-label="إعادة ضبط العداد"
        >
          <RefreshCw className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{count}</div>
          <div className="text-sm text-gray-500">من {maxCount}</div>
        </div>
        
        <button 
          onClick={handleIncrement}
          disabled={count >= maxCount}
          className={`counter-btn ${showAnimation ? 'scale-110' : ''} ${count >= maxCount ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="زيادة العداد"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
 