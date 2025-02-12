import { useState, useEffect } from 'react';
import { ScreenStatus, initialScreenStatus } from './screen-status.states';

export const useScreenStatus = (): [ScreenStatus, (status: ScreenStatus) => void] => {
    const [screenStatus, setScreenStatus] = useState<ScreenStatus>(initialScreenStatus);

    // Example of effect to update screen status
    useEffect(() => {
        // Implement logic here if needed
    }, []);

    return [screenStatus, setScreenStatus];
};
