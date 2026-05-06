import React, {ButtonHTMLAttributes, ReactNode, forwardRef} from 'react';
import cl from "./DSButton.module.css"

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

interface DSButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
    ({
         children,
         variant = 'primary',
         size = 'md',
         disabled = false,
         className = '',
         ...props
     }, ref) => {
        const variantClass = cl[variant];
        const sizeClass = cl[`size-${size}`];

        return (
            <button
                ref={ref}
                className={`${cl['ds-button']} ${variantClass} ${sizeClass} ${className}`}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

DSButton.displayName = 'DSButton';

export default DSButton;