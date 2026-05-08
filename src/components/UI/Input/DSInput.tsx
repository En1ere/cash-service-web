import React, {forwardRef, InputHTMLAttributes, useState} from 'react';
import cl from "./DSInput.module.css"
import IconCross from "../Icons/IconCross";
import DSButton from "@/components/UI/Button/DSButton";

type InputVariant = "primary" | "titled" | "number" | "number-titled";

interface DSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    variant?: InputVariant;
    label?: string;
    disabled?: boolean;
    className?: string;
    clearCb?: () => void;
    hideButton?: boolean;
}

const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
    ({
        variant = 'primary',
        label = '',
        disabled = false,
        className = '',
        clearCb,
        hideButton = false,
        ...props
    }, ref) => {
        const variantClass = cl[variant];
        const [hoverCross, setHoverCross] = useState(false);

        return (
            <div className={cl.inputBlock}>
                <label
                    htmlFor={props.id || ''}
                    className={cl.label}
                >
                    {label}
                </label>
                <div className={cl.inputWrapper}>
                    <input
                        ref={ref}
                        className={`
                            ${cl.input} 
                            ${variantClass} 
                            ${className}
                            ${hideButton && cl.inputWithoutBtn}
                        `}
                        type="text"
                        disabled={disabled}
                        {...props}
                    />
                    <DSButton
                        className={`
                            ${cl.clearButton} 
                            ${(props.value?.toString().length || 0) > 0 && cl.show}
                        `}
                        variant={"empty"}
                        onClick={clearCb}
                        onMouseOver={() => setHoverCross(true)}
                        onMouseLeave={() => setHoverCross(false)}
                    >
                        <IconCross className={cl.clearSvg} width={20} height={20} color={hoverCross ? 'var(--secondary-color)' : 'var(--primary-color)'}/>
                    </DSButton>
                </div>
            </div>
        );
    }
)

DSInput.displayName = 'DSInput';

export default DSInput;