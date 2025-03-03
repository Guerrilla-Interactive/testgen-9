// session-status.states.ts
export interface SessionContext {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  isTopDark: boolean;
  setIsTopDark: (isDark: boolean) => void;
  sessionStartDateTime: number;
  sessionLoaded: boolean;
  setSessionLoaded: (loaded: boolean) => void;
}

export const initialSessionContext: SessionContext = {
  activeScreen: 'defaultScreen',
  setActiveScreen: () => {},
  isTopDark: false,
  setIsTopDark: () => {},
  sessionStartDateTime: Date.now(),
  sessionLoaded: false,
  setSessionLoaded: () => {},
};
