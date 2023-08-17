import { createContext, useState, useContext } from 'react';

const AppContexts = createContext();

export const AppContextProvider = ({ children }) => { //WRAP _app with this.
  return (
    <AppContexts.Provider
      value={
        {
          //exported functions
        }
      }
    >
      {children}
    </AppContexts.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContexts);
  if (!context) {
    throw new Error('useAppContexts must be used within a AppContextProvider');
  }
  return context;
};

export default AppContexts;
