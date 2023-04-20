import { createContext, useState } from 'react';

interface ISidebarContext {
  sidebarToggle: boolean;
  toggleSidebar?: () => void;
  closeSidebar?: () => void;
}

const defaultState = {
  sidebarToggle: false,
};

export const SidebarContext = createContext<ISidebarContext>(defaultState);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarToggle, setSidebarToggle] = useState(
    defaultState.sidebarToggle,
  );

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
