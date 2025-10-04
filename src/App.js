import React, { useState } from 'react';
import {
  Input,
  ToastContainer,
  useToast,
  SidebarMenu,
  createMenuItem,
} from './components';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToast, removeToast, toasts } = useToast();

  const menuItems = [
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
      onClick: () => {
        addToast({
          type: 'success',
          title: 'Navigation',
          message: 'Navigated to Dashboard',
        });
        setIsSidebarOpen(false);
      },
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
          onClick: () => {
            addToast({
              type: 'info',
              title: 'Navigation',
              message: 'Navigated to All Users',
            });
            setIsSidebarOpen(false);
          },
        }),
        createMenuItem('user-roles', 'User Roles', {
          onClick: () => {
            addToast({
              type: 'info',
              title: 'Navigation',
              message: 'Navigated to User Roles',
            });
            setIsSidebarOpen(false);
          },
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
      onClick: () => {
        addToast({
          type: 'info',
          title: 'Navigation',
          message: 'Navigated to Settings',
        });
        setIsSidebarOpen(false);
      },
    }),
  ];

  const showSuccessToast = () => {
    addToast({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully.',
    });
  };

  const showErrorToast = () => {
    addToast({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  };

  const showWarningToast = () => {
    addToast({
      type: 'warning',
      title: 'Warning',
      message: 'Please review your input before proceeding.',
    });
  };

  const showInfoToast = () => {
    addToast({
      type: 'info',
      title: 'Information',
      message: 'Here is some useful information for you.',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Component Library Demo</h1>
        <p>Interactive showcase of the component library</p>

        <button className="demo-button" onClick={() => setIsSidebarOpen(true)}>
          Open Sidebar Menu
        </button>
      </header>

      <main className="App-main">
        <section className="component-section">
          <h2>Input Components</h2>
          <div className="input-demo">
            <div className="input-group">
              <label>Text Input (Clearable)</label>
              <Input
                type="text"
                placeholder="Type something..."
                value={inputValue}
                onChange={setInputValue}
                clearable
              />
            </div>

            <div className="input-group">
              <label>Email Input</label>
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={setEmail}
              />
            </div>

            <div className="input-group">
              <label>Password Input</label>
              <Input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={setPassword}
              />
            </div>
          </div>
        </section>

        <section className="component-section">
          <h2>Toast Notifications</h2>
          <div className="toast-demo">
            <button className="toast-button success" onClick={showSuccessToast}>
              Success Toast
            </button>
            <button className="toast-button error" onClick={showErrorToast}>
              Error Toast
            </button>
            <button className="toast-button warning" onClick={showWarningToast}>
              Warning Toast
            </button>
            <button className="toast-button info" onClick={showInfoToast}>
              Info Toast
            </button>
          </div>
        </section>
      </main>

      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title="Navigation Menu"
        items={menuItems}
        position="right"
        width="320px"
      />

      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
        position="bottom-right"
      />
    </div>
  );
}

export default App;
