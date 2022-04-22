import React, { FC, useEffect } from 'react';

const SmoothScroll:FC = () => {
    useEffect(() => {
        const smoothHandler = (e: Event):void => {
            console.log(e);
        };

        document.addEventListener('keydown', smoothHandler);

        return () => {
            document.removeEventListener('keydown', smoothHandler);
        };
    }, []);

    return null;
};

export default SmoothScroll;
