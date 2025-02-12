export interface ScreenStatus {
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

export const initialScreenStatus: ScreenStatus = {
    activeScreen: 'defaultScreen',
    setActiveScreen: () => {},
};
