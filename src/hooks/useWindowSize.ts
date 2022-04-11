import { useEffect, useState } from 'react';

interface IWindowSize {
    width: number,
    height: number
}

const useWindowSize = (): IWindowSize => {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        function handleResize(): void {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
