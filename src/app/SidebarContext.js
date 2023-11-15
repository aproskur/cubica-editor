import React, { createContext, useContext, useState } from 'react';

//a context for the Sidebar state
const SidebarContext = createContext();

// a custom hook to access the context values
export const useSidebar = () => {
  return useContext(SidebarContext);
};

// context provider to manage the Sidebar state
export const SidebarProvider = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log("isFixed FROM CONTEXT:", isFixed); // Log the current value

  // Provide the state and state updater functions through the context
  const value = {
    isFixed,
    setIsFixed,
    isHovered,
    setIsHovered,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};
