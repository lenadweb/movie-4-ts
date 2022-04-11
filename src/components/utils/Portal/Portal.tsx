import React, { FC } from 'react';
import ReactDOM from 'react-dom';

const Portal:FC = ({ children }) => ReactDOM.createPortal(
    children,
    document.body,
);

export default Portal;
