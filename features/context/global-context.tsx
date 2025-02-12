// global-context.tsx
"use client";

import { usePathname } from 'next/dist/client/components/navigation';
import { createContext, useContext, type ReactNode } from 'react';

import { initialSessionContext, type SessionContext } from './session-status/session-context.states';
import { useSessionContext } from './session-status/session-context.hooks';

export interface GlobalContext {
  pathname: string | null;
  sessionStatus: SessionContext;
}

const initialGlobalContext: GlobalContext = {
  pathname: null,
  sessionStatus: initialSessionContext,
};

const GlobalContextData = createContext<GlobalContext>(initialGlobalContext);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [sessionStatus] = useSessionContext();

  return (
    <GlobalContextData.Provider value={{ pathname, sessionStatus }}>
      {children}
    </GlobalContextData.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContextData);
