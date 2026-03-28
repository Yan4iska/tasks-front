import { Badge } from '@/components/ui/Badge/Badge';
import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('badge');
    expect(screen.getByText('Default').className).toMatch(/badge-gray/);
  });

  it('applies correct variant class', () => {
    render(<Badge variant="high">High</Badge>);
    expect(screen.getByText('High').className).toMatch(/badge-high/);
  });
});
