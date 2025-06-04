
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { salesDataset } from '@/utils/downloadData';

interface SalesDataContextType {
  salesData: any;
  setSalesData: (data: any) => void;
  isUsingUploadedData: boolean;
  setIsUsingUploadedData: (value: boolean) => void;
}

const SalesDataContext = createContext<SalesDataContextType | undefined>(undefined);

export const SalesDataProvider = ({ children }: { children: ReactNode }) => {
  const [salesData, setSalesData] = useState(salesDataset);
  const [isUsingUploadedData, setIsUsingUploadedData] = useState(false);

  return (
    <SalesDataContext.Provider value={{
      salesData,
      setSalesData,
      isUsingUploadedData,
      setIsUsingUploadedData
    }}>
      {children}
    </SalesDataContext.Provider>
  );
};

export const useSalesData = () => {
  const context = useContext(SalesDataContext);
  if (!context) {
    throw new Error('useSalesData must be used within a SalesDataProvider');
  }
  return context;
};
