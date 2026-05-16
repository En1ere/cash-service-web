import React, {forwardRef, InputHTMLAttributes, useState} from 'react';
import cl from "./DSInput.module.css"
import DSButton from "@/components/UI/Button/DSButton";
import DSIcon from "@/components/UI/Icons/DSIcon";

type InputVariant = "primary" | "titled" | "number" | "number-titled";

interface DSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    variant?: InputVariant;
    label?: string;
    disabled?: boolean;
    className?: string;
    clearCb: () => void;
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

        const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            clearCb();
        }

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
                        type="button"
                        className={`
                            ${cl.clearButton} 
                            ${(props.value?.toString().length || 0) > 0 && cl.show}
                            ${disabled && cl.inactive}
                        `}
                        variant={"empty"}
                        onClick={clickHandler}
                        onMouseOver={() => setHoverCross(true)}
                        onMouseLeave={() => setHoverCross(false)}
                    >
                        <DSIcon name="IconCross" width={20} height={20} color={hoverCross ? 'var(--secondary-color)' : 'var(--primary-color)'} className={cl.clearSvg} />
                    </DSButton>
                </div>
            </div>
        );
    }
)

DSInput.displayName = 'DSInput';

export default DSInput;