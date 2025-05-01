import React, { createContext, useState, useContext, useEffect } from 'react';

interface ImpactData {
  date: string;
  carbon: number;
  water: number;
  energy: number;
  waste: number;
  trees: number;
}

interface OffsetSource {
  type: string;
  amount: number;
  unit: string;
}

interface EnvironmentalContextType {
  impactData: ImpactData[];
  carbonOffset: number;
  addCarbonOffset: (amount: number) => void;
  addWaterUsage: (amount: number) => void;
  addEnergyUsage: (amount: number) => void;
  addWaste: (amount: number) => void;
  addTrees: (amount: number) => void;
}

const EnvironmentalContext = createContext<EnvironmentalContextType | undefined>(undefined);

export const EnvironmentalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [carbonOffset, setCarbonOffset] = useState(0);

  // Initialize with some data
  useEffect(() => {
    const now = new Date();
    const initialData: ImpactData[] = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      initialData.push({
        date: date.toISOString().split('T')[0],
        carbon: Math.round(1000 - (Math.random() * 200)),
        water: Math.round(5000 - (Math.random() * 1000)),
        energy: Math.round(2000 - (Math.random() * 400)),
        waste: Math.round(300 - (Math.random() * 60)),
        trees: Math.round(50 + (Math.random() * 10))
      });
    }
    
    setImpactData(initialData);
  }, []);

  const addCarbonOffset = (amount: number) => {
    setCarbonOffset(prev => prev + amount);
    
    setImpactData(prev => {
      if (prev.length === 0) return prev;
      const newData = [...prev];
      newData[newData.length - 1].carbon -= amount / 1000; // Convert kg to tons
      return newData;
    });
  };

  const addWaterUsage = (amount: number) => {
    setImpactData(prev => {
      if (prev.length === 0) return prev;
      const newData = [...prev];
      newData[newData.length - 1].water += amount;
      return newData;
    });
  };

  const addEnergyUsage = (amount: number) => {
    setImpactData(prev => {
      if (prev.length === 0) return prev;
      const newData = [...prev];
      newData[newData.length - 1].energy += amount;
      return newData;
    });
  };

  const addWaste = (amount: number) => {
    setImpactData(prev => {
      if (prev.length === 0) return prev;
      const newData = [...prev];
      newData[newData.length - 1].waste += amount;
      return newData;
    });
  };

  const addTrees = (amount: number) => {
    setImpactData(prev => {
      if (prev.length === 0) return prev;
      const newData = [...prev];
      newData[newData.length - 1].trees += amount;
      return newData;
    });
  };

  return (
    <EnvironmentalContext.Provider value={{ 
      impactData, 
      carbonOffset,
      addCarbonOffset,
      addWaterUsage,
      addEnergyUsage,
      addWaste,
      addTrees
    }}>
      {children}
    </EnvironmentalContext.Provider>
  );
};

export const useEnvironmentalData = () => {
  const context = useContext(EnvironmentalContext);
  if (!context) {
    throw new Error('useEnvironmentalData must be used within an EnvironmentalProvider');
  }
  return context;
};