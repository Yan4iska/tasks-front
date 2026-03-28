import Checkbox from '@/components/ui/checkbox/Checkbox';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Checkbox component', () => {
  test('renders checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with specific id', () => {
    render(<Checkbox id="my-checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-checkbox');
  });

  test('applies color class', () => {
    render(<Checkbox color="red" />);
    expect(screen.getByRole('checkbox').className).toMatch(/checked-red/);
  });

  test('applies extra class', () => {
    render(<Checkbox extra="my-extra-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('my-extra-class');
  });

  test('triggers onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
