import React from 'react';
import { icons } from './source';
import {SvgIconProps} from "@/types/IconProps";

const DSIcon = ({ name, ...props }: SvgIconProps) => {
    const Component = icons[name];

    if (!Component) return "null";

    return <Component name={name} {...props} />;
};

export default DSIcon;