import React, { InputHTMLAttributes, forwardRef } from 'react'
import './UiInput.scss'

export interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    error?: boolean
    disabled?: boolean
    variant?: 'default' | 'outline'
}

const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
    (
        {
            placeholder = 'Введите текст',
            error = false,
            disabled = false,
            variant = 'default',
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <input
                ref={ref}
                placeholder={placeholder}
                disabled={disabled}
                className={`ui-input ui-input--${variant} ${
                    error ? 'ui-input--error' : ''
                } ${disabled ? 'ui-input--disabled' : ''} ${className || ''}`}
                {...props}
            />
        )
    },
)

UiInput.displayName = 'UiInput'

export default UiInput
