import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type AppContextType = {
  recentMembers: any[];
  setRecentMembers: (members: any[]) => void;
  refreshData: () => void;
};

// Create context with default values
const AppContext = createContext<AppContextType>({
  recentMembers: [],
  setRecentMembers: () => {},
  refreshData: () => {},
});

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [recentMembers, setRecentMembers] = useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Value object to provide to consumers
  const value = {
    recentMembers,
    setRecentMembers,
    refreshData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};