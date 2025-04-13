import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CountersState {
  [dhikrId: number]: number;
}

interface CounterContextType {
  counts: CountersState;
  incrementCount: (dhikrId: number) => void;
  resetCount: (dhikrId: number) => void;
  resetAllCounts: () => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<CountersState>(() => {
    const savedCounts = localStorage.getItem('dhikr-counts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  useEffect(() => {
    localStorage.setItem('dhikr-counts', JSON.stringify(counts));
  }, [counts]);

  const incrementCount = (dhikrId: number) => {
    setCounts(prev => ({
      ...prev,
      [dhikrId]: (prev[dhikrId] || 0) + 1
    }));
  };

  const resetCount = (dhikrId: number) => {
    setCounts(prev => ({
      ...prev,
      [dhikrId]: 0
    }));
  };

  const resetAllCounts = () => {
    setCounts({});
  };

  return (
    <CounterContext.Provider value={{ counts, incrementCount, resetCount, resetAllCounts }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
 