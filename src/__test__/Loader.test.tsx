import Loader from '@/components/ui/Loader/Loader';
import { render, screen } from '@testing-library/react';

describe('Loader component', () => {
  test('renders loader wrapper', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders loader icon', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });
});
