import { Field } from '@/components/ui/fields/Field';
import { render, screen } from '@testing-library/react';

describe('Field component', () => {
  test('renders input and label', () => {
    render(<Field id="username" label="Username" placeholder="Enter your name" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<Field id="email" label="Email" placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  test('input is disabled when disabled prop is true', () => {
    render(<Field id="disabled" label="Disabled" placeholder="-" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  test('applies error class when state is error', () => {
    render(<Field id="email" label="Email" placeholder="-" state="error" />);
    expect(screen.getByLabelText('Email').className).toMatch(/error/);
  });

  test('applies success class when state is success', () => {
    render(<Field id="email" label="Email" placeholder="-" state="success" />);
    expect(screen.getByLabelText('Email').className).toMatch(/success/);
  });

  test('renders input with correct type', () => {
    render(<Field id="password" label="Password" placeholder="-" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('prevents non-numeric input when isNumber is true', () => {
    const { getByRole } = render(<Field id="number" label="Test" placeholder="Test" isNumber />);
    const input = getByRole('textbox');

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    // Мокаем preventDefault на самом объекте события
    Object.defineProperty(event, 'preventDefault', {
      value: jest.fn(),
      writable: true,
    });

    input.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
