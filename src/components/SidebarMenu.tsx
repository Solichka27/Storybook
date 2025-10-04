import React, { useState, useEffect, useRef } from 'react';
import './SidebarMenu.css';

export interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    children?: MenuItem[];
    disabled?: boolean;
    badge?: string | number;
}

export interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items: MenuItem[];
    title?: string;
    position?: 'left' | 'right';
    width?: string;
    overlay?: boolean;
    className?: string;
    onItemClick?: (item: MenuItem) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
    isOpen,
    onClose,
    items,
    title = 'Menu',
    position = 'right',
    width = '320px',
    overlay = true,
    className = '',
    onItemClick,
}) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const handleItemClick = (item: MenuItem) => {
        if (item.disabled) return;

        if (item.children && item.children.length > 0) {
            toggleExpanded(item.id);
        } else {
            setActiveItem(item.id);
            item.onClick?.();
            onItemClick?.(item);

            // Close sidebar if it's a leaf item (no children)
            if (!item.children || item.children.length === 0) {
                setTimeout(() => onClose(), 150);
            }
        }
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const isExpanded = expandedItems.has(item.id);
        const isActive = activeItem === item.id;
        const hasChildren = item.children && item.children.length > 0;

        return (
            <li key={item.id} className="menu-item">
                <button
                    className={`menu-button ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''} level-${level}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    aria-expanded={hasChildren ? isExpanded : undefined}
                >
                    <div className="menu-button-content">
                        {item.icon && <span className="menu-icon">{item.icon}</span>}

                        <span className="menu-label">{item.label}</span>

                        {item.badge && <span className="menu-badge">{item.badge}</span>}

                        {hasChildren && (
                            <span className={`menu-arrow ${isExpanded ? 'expanded' : ''}`}>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="6,9 12,15 18,9" />
                                </svg>
                            </span>
                        )}
                    </div>
                </button>

                {hasChildren && (
                    <div className={`menu-submenu ${isExpanded ? 'expanded' : ''}`}>
                        <ul className="menu-list">
                            {item.children?.map(child => renderMenuItem(child, level + 1))}
                        </ul>
                    </div>
                )}
            </li>
        );
    };

    // Removed unused defaultIcons object to fix linting warnings

    return (
        <>
            {overlay && isOpen && (
                <div
                    className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <div
                ref={sidebarRef}
                className={`sidebar-menu ${position} ${isOpen ? 'open' : ''} ${className}`}
                style={{ width }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sidebar-title"
            >
                <div className="sidebar-header">
                    <h2 id="sidebar-title" className="sidebar-title">
                        {title}
                    </h2>
                    <button
                        className="sidebar-close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <nav className="sidebar-content">
                    <ul className="menu-list">
                        {items.map(item => renderMenuItem(item))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

// Helper function to create menu items with default icons
export const createMenuItem = (
    id: string,
    label: string,
    options: Partial<MenuItem> = {}
): MenuItem => ({
    id,
    label,
    icon: options.icon,
    href: options.href,
    onClick: options.onClick,
    children: options.children,
    disabled: options.disabled,
    badge: options.badge,
});

export default SidebarMenu;
