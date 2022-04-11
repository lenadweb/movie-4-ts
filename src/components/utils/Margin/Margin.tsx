import React, { FC } from 'react';

interface IMargin {
    margin: string;
}

const Margin:FC<IMargin> = ({ margin = '0', children }) => (
    <div style={{ margin }}>
        <>
            {children}
        </>
    </div>
);

export default Margin;
