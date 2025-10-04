import React, { useState, useEffect } from 'react';
import './Toast.css';

export interface ToastProps {
    id?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    duration?: number;
    position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
    closable?: boolean;
    onClose?: () => void;
    onAction?: () => void;
    actionText?: string;
    className?: string;
}

export interface ToastItem extends ToastProps {
    id: string;
    timestamp: number;
}

const Toast: React.FC<ToastProps> = ({
    id = `toast-${Date.now()}`,
    type = 'info',
    title,
    message,
    duration = 5000,
    position = 'bottom-right',
    closable = true,
    onClose,
    onAction,
    actionText,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300); // Match CSS transition duration
    };

    const handleAction = () => {
        onAction?.();
        handleClose();
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                );
            case 'error':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                );
            case 'info':
            default:
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                );
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`toast ${type} ${position} ${isExiting ? 'exiting' : 'entering'} ${className}`}
            role="alert"
            aria-live="polite"
        >
            <div className="toast-content">
                <div className="toast-icon">{getIcon()}</div>

                <div className="toast-body">
                    {title && <h4 className="toast-title">{title}</h4>}
                    <p className="toast-message">{message}</p>

                    {onAction && actionText && (
                        <button
                            className="toast-action"
                            onClick={handleAction}
                            type="button"
                        >
                            {actionText}
                        </button>
                    )}
                </div>

                {closable && (
                    <button
                        className="toast-close"
                        onClick={handleClose}
                        type="button"
                        aria-label="Close notification"
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

            {duration > 0 && (
                <div className="toast-progress">
                    <div
                        className="toast-progress-bar"
                        style={{ animationDuration: `${duration}ms` }}
                    />
                </div>
            )}
        </div>
    );
};

// Toast Container Component for managing multiple toasts
export interface ToastContainerProps {
    toasts: ToastItem[];
    onRemoveToast: (id: string) => void;
    position?: ToastProps['position'];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    onRemoveToast,
    position = 'bottom-right',
}) => {
    return (
        <div className={`toast-container ${position}`}>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => onRemoveToast(toast.id)}
                />
            ))}
        </div>
    );
};

// Toast Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (toast: Omit<ToastItem, 'id' | 'timestamp'>) => {
        const newToast: ToastItem = {
            ...toast,
            id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
        };

        setToasts(prev => [...prev, newToast]);
        return newToast.id;
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const clearAllToasts = () => {
        setToasts([]);
    };

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
    };
};

export default Toast;
