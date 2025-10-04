import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import Input from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with password visibility toggle, clearable functionality, and multiple input types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'The input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

// Password input with toggle
export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
    value: 'secretpassword',
  },
};

// Email input
export const Email: Story = {
  args: {
    placeholder: 'Enter email address...',
    type: 'email',
    value: 'user@example.com',
  },
};

// Number input
export const Number: Story = {
  args: {
    placeholder: 'Enter number...',
    type: 'number',
    value: '42',
  },
};

// Clearable input
export const Clearable: Story = {
  args: {
    placeholder: 'Type and clear...',
    type: 'text',
    value: 'Clearable text',
    clearable: true,
  },
};

// Error state
export const WithError: Story = {
  args: {
    placeholder: 'Enter valid email...',
    type: 'email',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'This is disabled...',
    type: 'text',
    value: 'Cannot edit this',
    disabled: true,
  },
};

// Required field
export const Required: Story = {
  args: {
    placeholder: 'This field is required...',
    type: 'text',
    required: true,
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleEmailChange = (newEmail: string) => {
      setEmail(newEmail);
      // Simple email validation
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
      setShowError(newEmail.length > 0 && !isValid);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '400px',
        }}
      >
        <div>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Regular Text Input (Clearable)
          </label>
          <Input
            type="text"
            placeholder="Type something..."
            value={value}
            onChange={setValue}
            clearable
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Current value: "{value}"
          </p>
        </div>

        <div>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Email Input (with validation)
          </label>
          <Input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={handleEmailChange}
            error={showError}
            errorMessage={
              showError ? 'Please enter a valid email address' : undefined
            }
            clearable
          />
        </div>

        <div>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Password Input (with toggle)
          </label>
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={setPassword}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Disabled Input
          </label>
          <Input
            type="text"
            placeholder="This is disabled..."
            value="Cannot edit this"
            disabled
          />
        </div>
      </div>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        width: '800px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3
          style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}
        >
          Basic Types
        </h3>
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="number" placeholder="Number input" />
        <Input type="password" placeholder="Password input" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3
          style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}
        >
          With Features
        </h3>
        <Input type="text" placeholder="Clearable input" clearable />
        <Input type="password" placeholder="Password with toggle" />
        <Input
          type="email"
          placeholder="Email with error"
          error
          errorMessage="Invalid email format"
        />
        <Input type="text" placeholder="Disabled input" disabled />
      </div>
    </div>
  ),
};
