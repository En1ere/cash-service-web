import React, {forwardRef, InputHTMLAttributes} from 'react';
import cl from "./DSInput.module.css"
import IconCross from "../Icons/IconCross";
import DSButton from "@/components/UI/Button/DSButton";

type InputVariant = "primary" | "titled" | "number" | "number-titled";

interface DSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    variant?: InputVariant;
    disabled?: boolean;
    className?: string;
}

const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
    ({
        variant = 'primary',
        disabled = false,
        className = '',
        ...props
    }, ref) => {
        const variantClass = cl[variant];

        return (
            <div className={cl.inputWrapper}>
                <input
                    ref={ref}
                    className={`${cl.input} ${variantClass} ${className}`}
                    type="text"
                    disabled={disabled}
                    {...props}
                />
                <DSButton className={`${cl.clearButton} ${(props.value?.toString().length || 0) < 0 ? cl.show : ''}`} variant={"empty"}>
                    <IconCross width={20} height={20} color={'#3498db'} />
                </DSButton>
            </div>
        );
    }
)

DSInput.displayName = 'DSInput';

export default DSInput;