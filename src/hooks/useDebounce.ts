import { useCallback, useEffect, useRef } from 'react';

export default function useDebounce(callback: (...args: any)=> void, delay: number): (...args: any)=> void {
    const timer = useRef();

    const debouncedCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        (timer.current as any) = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
}
