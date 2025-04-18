// global-context.tsx
"use client";

import { usePathname } from 'next/dist/client/components/navigation';
import { createContext, useContext, useState, type ReactNode, Dispatch, SetStateAction } from 'react';

import { initialSessionContext, type SessionContext } from './session-status/session-context.states';
import { useSessionContext } from './session-status/session-context.hooks';

export interface GlobalContext {
  pathname: string | null;
  sessionStatus: SessionContext;
  isScoreboardEditing: boolean;
  setIsScoreboardEditing: Dispatch<SetStateAction<boolean>>;
}

const initialGlobalContext: GlobalContext = {
  pathname: null,
  sessionStatus: initialSessionContext,
  isScoreboardEditing: false,
  setIsScoreboardEditing: () => {},
};

const GlobalContextData = createContext<GlobalContext>(initialGlobalContext);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [sessionStatus] = useSessionContext();
  const [isScoreboardEditing, setIsScoreboardEditing] = useState<boolean>(false);

  return (
    <GlobalContextData.Provider value={{ pathname, sessionStatus, isScoreboardEditing, setIsScoreboardEditing }}>
      {children}
    </GlobalContextData.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContextData);
