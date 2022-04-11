import React, { FC } from 'react';

interface IDisplay {
    show: boolean
}

const Display:FC<IDisplay> = ({ show = true, children }) => (show ? (
    <>
        {children}
    </>
) : null);

export default Display;
