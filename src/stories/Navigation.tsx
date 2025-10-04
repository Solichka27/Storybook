import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import SidebarMenu, { createMenuItem } from '../components/SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
    title: 'Components/SidebarMenu',
    component: SidebarMenu,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A sliding sidebar menu component with nested submenus and smooth animations.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Whether the sidebar is open',
        },
        title: {
            control: 'text',
            description: 'Sidebar title',
        },
        position: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Sidebar position',
        },
        width: {
            control: 'text',
            description: 'Sidebar width',
        },
        overlay: {
            control: 'boolean',
            description: 'Whether to show overlay when open',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu items with icons
const basicMenuItems = [
    createMenuItem('dashboard', 'Dashboard', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        onClick: () => alert('Dashboard clicked!'),
    }),
    createMenuItem('analytics', 'Analytics', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
            </svg>
        ),
        onClick: () => alert('Analytics clicked!'),
    }),
    createMenuItem('settings', 'Settings', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        onClick: () => alert('Settings clicked!'),
    }),
];

// Menu items with nested submenus
const nestedMenuItems = [
    createMenuItem('dashboard', 'Dashboard', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        onClick: () => alert('Dashboard clicked!'),
    }),
    createMenuItem('users', 'User Management', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        children: [
            createMenuItem('user-list', 'All Users', {
                onClick: () => alert('All Users clicked!'),
            }),
            createMenuItem('user-roles', 'User Roles', {
                onClick: () => alert('User Roles clicked!'),
            }),
            createMenuItem('user-permissions', 'Permissions', {
                onClick: () => alert('Permissions clicked!'),
            }),
        ],
    }),
    createMenuItem('content', 'Content Management', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
            </svg>
        ),
        children: [
            createMenuItem('posts', 'Posts', {
                children: [
                    createMenuItem('all-posts', 'All Posts', {
                        onClick: () => alert('All Posts clicked!'),
                    }),
                    createMenuItem('draft-posts', 'Draft Posts', {
                        onClick: () => alert('Draft Posts clicked!'),
                    }),
                    createMenuItem('published-posts', 'Published Posts', {
                        onClick: () => alert('Published Posts clicked!'),
                    }),
                ],
            }),
            createMenuItem('pages', 'Pages', {
                onClick: () => alert('Pages clicked!'),
            }),
            createMenuItem('media', 'Media Library', {
                onClick: () => alert('Media Library clicked!'),
            }),
        ],
    }),
    createMenuItem('settings', 'Settings', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        children: [
            createMenuItem('general', 'General', {
                onClick: () => alert('General Settings clicked!'),
            }),
            createMenuItem('security', 'Security', {
                onClick: () => alert('Security Settings clicked!'),
            }),
            createMenuItem('notifications', 'Notifications', {
                onClick: () => alert('Notification Settings clicked!'),
            }),
        ],
    }),
];

// Menu items with badges and disabled states
const advancedMenuItems = [
    createMenuItem('dashboard', 'Dashboard', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        onClick: () => alert('Dashboard clicked!'),
    }),
    createMenuItem('messages', 'Messages', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        badge: 3,
        onClick: () => alert('Messages clicked!'),
    }),
    createMenuItem('analytics', 'Analytics', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
            </svg>
        ),
        badge: 'New',
        onClick: () => alert('Analytics clicked!'),
    }),
    createMenuItem('maintenance', 'Maintenance Mode', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
            </svg>
        ),
        disabled: true,
    }),
    createMenuItem('logout', 'Logout', {
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
        ),
        onClick: () => alert('Logout clicked!'),
    }),
];

// Basic sidebar (right position)
export const Basic: Story = {
    args: {
        isOpen: true,
        title: 'Navigation',
        items: basicMenuItems,
        position: 'right',
        width: '280px',
    },
};

// Left positioned sidebar
export const LeftPosition: Story = {
    args: {
        isOpen: true,
        title: 'Navigation',
        items: basicMenuItems,
        position: 'left',
        width: '280px',
    },
};

// Nested menu items
export const WithNestedMenus: Story = {
    args: {
        isOpen: true,
        title: 'Admin Panel',
        items: nestedMenuItems,
        position: 'right',
        width: '320px',
    },
};

// Menu with badges and disabled items
export const WithBadgesAndDisabled: Story = {
    args: {
        isOpen: true,
        title: 'Dashboard',
        items: advancedMenuItems,
        position: 'right',
        width: '280px',
    },
};

// Interactive sidebar
export const Interactive: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>Interactive Sidebar Menu</h3>
                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => setIsOpen(true)}
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Open Sidebar Menu
                    </button>
                </div>

                <p style={{ color: '#666', fontSize: '14px' }}>
                    Click the button to open the sidebar menu. You can also press ESC to
                    close it or click outside the menu.
                </p>

                <SidebarMenu
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Navigation Menu"
                    items={nestedMenuItems}
                    position="right"
                    width="320px"
                    onItemClick={item => console.log('Menu item clicked:', item.label)}
                />
            </div>
        );
    },
};

// All variants showcase
export const AllVariants: Story = {
    render: () => {
        const [activeDemo, setActiveDemo] = useState<
            'basic' | 'nested' | 'advanced'
        >('basic');

        const getMenuItems = () => {
            switch (activeDemo) {
                case 'basic':
                    return basicMenuItems;
                case 'nested':
                    return nestedMenuItems;
                case 'advanced':
                    return advancedMenuItems;
                default:
                    return basicMenuItems;
            }
        };

        const getTitle = () => {
            switch (activeDemo) {
                case 'basic':
                    return 'Basic Menu';
                case 'nested':
                    return 'Nested Menu';
                case 'advanced':
                    return 'Advanced Menu';
                default:
                    return 'Basic Menu';
            }
        };

        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>Sidebar Menu Variants</h3>

                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => setActiveDemo('basic')}
                        style={{
                            backgroundColor: activeDemo === 'basic' ? '#3b82f6' : '#e5e7eb',
                            color: activeDemo === 'basic' ? 'white' : '#374151',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '8px',
                        }}
                    >
                        Basic
                    </button>
                    <button
                        onClick={() => setActiveDemo('nested')}
                        style={{
                            backgroundColor: activeDemo === 'nested' ? '#3b82f6' : '#e5e7eb',
                            color: activeDemo === 'nested' ? 'white' : '#374151',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '8px',
                        }}
                    >
                        Nested
                    </button>
                    <button
                        onClick={() => setActiveDemo('advanced')}
                        style={{
                            backgroundColor:
                                activeDemo === 'advanced' ? '#3b82f6' : '#e5e7eb',
                            color: activeDemo === 'advanced' ? 'white' : '#374151',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Advanced
                    </button>
                </div>

                <div
                    style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    <h4 style={{ margin: '0 0 16px 0' }}>{getTitle()}</h4>
                    <SidebarMenu
                        isOpen={true}
                        onClose={() => { }}
                        title={getTitle()}
                        items={getMenuItems()}
                        position="right"
                        width="280px"
                        overlay={false}
                    />
                </div>
            </div>
        );
    },
};
