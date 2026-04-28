import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import './UiButton.scss'

export interface UiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
}

const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>(
    (
        {
            variant = 'primary',
            size = 'medium',
            disabled = false,
            loading = false,
            fullWidth = false,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`ui-button ui-button--${variant} ui-button--${size} ${
                    fullWidth ? 'ui-button--full-width' : ''
                } ${disabled ? 'ui-button--disabled' : ''} ${
                    loading ? 'ui-button--loading' : ''
                } ${className || ''}`}
                {...props}
            >
                {loading ? <span className="ui-button__loader" /> : null}
                {children}
            </button>
        )
    },
)

UiButton.displayName = 'UiButton'

export default UiButton
