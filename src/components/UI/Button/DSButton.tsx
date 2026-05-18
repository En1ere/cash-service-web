import React, {ButtonHTMLAttributes, ReactNode, forwardRef} from 'react';
import cl from "./DSButton.module.css"
import DSLoader from "@/components/UI/Loader/DSLoader";
import {StyleVariants} from "@/types/StyleVariants";

interface DSButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
    children: ReactNode;
    variant?: StyleVariants;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
}

const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
    ({
         children,
         variant = 'primary',
         size = 'md',
         disabled = false,
         isLoading = false,
         className = '',
         ...props
     }, ref) => {
        const variantClass = cl[variant];
        const sizeClass = cl[`size-${size}`];

        return (
            <button
                ref={ref}
                className={`
                    ${cl.dsButton} 
                    ${variantClass} 
                    ${sizeClass} 
                    ${className} 
                    ${isLoading && cl.loading}
                `}
                disabled={disabled}
                {...props}
            >
                {isLoading ?
                    <div className={cl.loadingWrapper}>
                        <DSLoader variant={variant} />
                    </div>
                :
                    children
                }

            </button>
        );
    }
);

DSButton.displayName = 'DSButton';

export default DSButton;