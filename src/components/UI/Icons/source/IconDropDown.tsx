import React from 'react';

const IconCross = ({className = "", width = 20, height = 20, color = '#d3d3d3'}: Readonly<{className?: string, width?: number, height?: number, color?: string}>) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path className={className} fillRule="evenodd" clipRule="evenodd" d="M8 11.89l-1.414-1.415-4.95-4.95L3.05 4.111 8 9.06l4.95-4.95 1.414 1.414-4.95 4.95L8 11.889z" fill={color}></path>
        </svg>
    );
};

export default IconCross;