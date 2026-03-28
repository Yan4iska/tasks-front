// src/__test__/Button.test.tsx
import { Button } from '@/components/ui/buttons/Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component', () => {
  test('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
