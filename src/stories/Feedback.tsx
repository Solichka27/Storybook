import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import Toast, { ToastContainer, useToast } from '../components/Toast';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A toast notification component with auto-dismiss, positioning, and multiple variants.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info'],
            description: 'The toast type/variant',
        },
        title: {
            control: 'text',
            description: 'Toast title',
        },
        message: {
            control: 'text',
            description: 'Toast message content',
        },
        duration: {
            control: 'number',
            description:
                'Auto-dismiss duration in milliseconds (0 = no auto-dismiss)',
        },
        position: {
            control: 'select',
            options: [
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left',
                'top-center',
                'bottom-center',
            ],
            description: 'Toast position on screen',
        },
        closable: {
            control: 'boolean',
            description: 'Whether to show close button',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Success toast
export const Success: Story = {
    args: {
        type: 'success',
        title: 'Success!',
        message: 'Your changes have been saved successfully.',
        duration: 5000,
        position: 'bottom-right',
    },
};

// Error toast
export const Error: Story = {
    args: {
        type: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        duration: 5000,
        position: 'bottom-right',
    },
};

// Warning toast
export const Warning: Story = {
    args: {
        type: 'warning',
        title: 'Warning',
        message: 'Please review your input before proceeding.',
        duration: 5000,
        position: 'bottom-right',
    },
};

// Info toast
export const Info: Story = {
    args: {
        type: 'info',
        title: 'Information',
        message: 'Here is some useful information for you.',
        duration: 5000,
        position: 'bottom-right',
    },
};

// Toast without title
export const WithoutTitle: Story = {
    args: {
        type: 'success',
        message: 'Operation completed successfully.',
        duration: 5000,
        position: 'bottom-right',
    },
};

// Toast with action button
export const WithAction: Story = {
    args: {
        type: 'info',
        title: 'New Update Available',
        message: 'A new version of the app is ready to install.',
        actionText: 'Update Now',
        onAction: () => alert('Update action triggered!'),
        duration: 0, // No auto-dismiss when action is available
        position: 'bottom-right',
    },
};

// Non-closable toast
export const NonClosable: Story = {
    args: {
        type: 'info',
        title: 'Processing',
        message: 'Please wait while we process your request...',
        duration: 0,
        closable: false,
        position: 'bottom-right',
    },
};

// Different positions
export const Positions: Story = {
    render: () => {
        const { toasts, addToast, removeToast } = useToast();

        const showToast = (position: any) => {
            addToast({
                type: 'info',
                title: 'Position Demo',
                message: `This toast appears at ${position}`,
                position,
                duration: 3000,
            });
        };

        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>Toast Positions</h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        maxWidth: '400px',
                    }}
                >
                    <button onClick={() => showToast('top-left')}>Top Left</button>
                    <button onClick={() => showToast('top-center')}>Top Center</button>
                    <button onClick={() => showToast('top-right')}>Top Right</button>
                    <button onClick={() => showToast('bottom-left')}>Bottom Left</button>
                    <button onClick={() => showToast('bottom-center')}>
                        Bottom Center
                    </button>
                    <button onClick={() => showToast('bottom-right')}>
                        Bottom Right
                    </button>
                </div>

                <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
            </div>
        );
    },
};

// Interactive toast manager
export const Interactive: Story = {
    render: () => {
        const { toasts, addToast, removeToast, clearAllToasts } = useToast();

        const showSuccessToast = () => {
            addToast({
                type: 'success',
                title: 'Success!',
                message: 'Operation completed successfully.',
                duration: 4000,
            });
        };

        const showErrorToast = () => {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'An error occurred. Please try again.',
                duration: 6000,
            });
        };

        const showWarningToast = () => {
            addToast({
                type: 'warning',
                title: 'Warning',
                message: 'Please check your input before continuing.',
                duration: 5000,
            });
        };

        const showInfoToast = () => {
            addToast({
                type: 'info',
                title: 'Info',
                message: 'Here is some useful information.',
                duration: 4000,
            });
        };

        const showActionToast = () => {
            addToast({
                type: 'info',
                title: 'Action Required',
                message: 'Please confirm your action.',
                actionText: 'Confirm',
                onAction: () => alert('Action confirmed!'),
                duration: 0,
            });
        };

        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>Interactive Toast Demo</h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                        marginBottom: '20px',
                    }}
                >
                    <button
                        onClick={showSuccessToast}
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Success Toast
                    </button>
                    <button
                        onClick={showErrorToast}
                        style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Error Toast
                    </button>
                    <button
                        onClick={showWarningToast}
                        style={{
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Warning Toast
                    </button>
                    <button
                        onClick={showInfoToast}
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Info Toast
                    </button>
                    <button
                        onClick={showActionToast}
                        style={{
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Action Toast
                    </button>
                    <button
                        onClick={clearAllToasts}
                        style={{
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Clear All
                    </button>
                </div>

                <p style={{ color: '#666', fontSize: '14px' }}>
                    Active toasts: {toasts.length}
                </p>

                <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
            </div>
        );
    },
};

// All variants showcase
export const AllVariants: Story = {
    render: () => {
        const { toasts, addToast, removeToast } = useToast();

        React.useEffect(() => {
            // Show all variants with a delay
            const timeouts = [
                setTimeout(
                    () =>
                        addToast({
                            type: 'success',
                            title: 'Success',
                            message: 'Operation completed!',
                        }),
                    100
                ),
                setTimeout(
                    () =>
                        addToast({
                            type: 'error',
                            title: 'Error',
                            message: 'Something went wrong!',
                        }),
                    300
                ),
                setTimeout(
                    () =>
                        addToast({
                            type: 'warning',
                            title: 'Warning',
                            message: 'Please review your input!',
                        }),
                    500
                ),
                setTimeout(
                    () =>
                        addToast({
                            type: 'info',
                            title: 'Info',
                            message: 'Here is some information!',
                        }),
                    700
                ),
            ];

            return () => timeouts.forEach(clearTimeout);
        }, [addToast]);

        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>All Toast Variants</h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    This story automatically shows all toast variants when loaded.
                </p>

                <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
            </div>
        );
    },
};
