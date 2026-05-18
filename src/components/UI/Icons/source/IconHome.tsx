import React from 'react';
import {SvgIconProps} from "@/types/IconProps";

const IconHome = ({width = 48, height = 48, color = '#8F76F5'}: SvgIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0,0,256,256">
            <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" style={{ mixBlendMode: 'normal' }}>
                <g transform="scale(4,4)">
                    <path d="M32,3l-31,25l0.49219,0.6543c1.367,1.823 3.97728,2.13741 5.73828,0.69141l24.76953,-20.3457l24.76953,20.3457c1.761,1.446 4.37128,1.13159 5.73828,-0.69141l0.49219,-0.6543l-9,-7.25781v-12.74219h-9v5.48438zM32,13l-24,19v24h48v-21zM26,34h12v18h-12z"></path>
                </g>
            </g>
        </svg>
    );
};

export default IconHome;