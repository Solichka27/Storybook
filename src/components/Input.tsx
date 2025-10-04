import React, { useState, forwardRef } from 'react';
import './Input.css';

export interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    clearable?: boolean;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            placeholder = '',
            value = '',
            onChange,
            onBlur,
            onFocus,
            disabled = false,
            error = false,
            errorMessage,
            clearable = false,
            className = '',
            id,
            name,
            required = false,
        },
        ref
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        const handleClear = () => {
            onChange?.('');
        };

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
        };

        const handleFocus = () => {
            setIsFocused(true);
            onFocus?.();
        };

        const handleBlur = () => {
            setIsFocused(false);
            onBlur?.();
        };

        const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
        const showClearButton = clearable && value && !disabled;
        const showPasswordToggle = type === 'password';

        return (
            <div className={`input-container ${className}`}>
                <div
                    className={`input-wrapper ${error ? 'error' : ''} ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}
                >
                    <input
                        ref={ref}
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        id={id}
                        name={name}
                        required={required}
                        className="input-field"
                    />

                    {showPasswordToggle && (
                        <button
                            type="button"
                            className="input-icon password-toggle"
                            onClick={togglePasswordVisibility}
                            tabIndex={-1}
                            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                            {isPasswordVisible ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    )}

                    {showClearButton && (
                        <button
                            type="button"
                            className="input-icon clear-button"
                            onClick={handleClear}
                            tabIndex={-1}
                            aria-label="Clear input"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                {error && errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
