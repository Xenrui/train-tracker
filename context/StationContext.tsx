import { FareType, Station } from '@/types/types';
import { createContext, ReactNode, useContext, useState } from 'react';

interface StationContextType {
  fromStation: Station | null;
  toStation: Station | null;
  fareType: FareType;
  isDiscounted: boolean;
  setFromStation: (station: Station | null) => void;
  setToStation: (station: Station | null) => void;
  setFareType: (fareType: FareType) => void;
  setIsDiscounted: (value: boolean) => void;
  swapStations: () => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

const StationProvider = ({ children }: { children: ReactNode }) => {
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  const [fareType, setFareType] = useState<FareType>('beep');
  const [isDiscounted, setIsDiscounted] = useState(false);

  const swapStations = () => {
    if (fromStation && toStation) {
      const temp = fromStation;
      setFromStation(toStation);
      setToStation(temp);
    }
  };

  return (
    <StationContext.Provider
      value={{
        fromStation,
        toStation,
        fareType,
        isDiscounted,
        setFromStation,
        setToStation,
        setFareType,
        setIsDiscounted,
        swapStations,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStation = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error('useRoute must be used within RouteProvider');
  }
  return context;
};
export default StationProvider;
