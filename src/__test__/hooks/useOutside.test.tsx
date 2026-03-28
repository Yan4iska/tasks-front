import { render, fireEvent } from '@testing-library/react';
import { useOutside } from '@/hooks/useOutside'; // путь подкорректируй под себя
import React from 'react';

const TestComponent = ({ initialVisible = true }: { initialVisible?: boolean }) => {
  const { ref, isShow, setIsShow } = useOutside<HTMLDivElement>(initialVisible);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        {isShow ? 'Visible' : 'Hidden'}
      </div>
      <button onClick={() => setIsShow(!isShow)}>Toggle</button>
    </div>
  );
};

describe('useOutside', () => {
  it('initially sets visibility based on the argument', () => {
    const { getByText } = render(<TestComponent initialVisible={true} />);
    expect(getByText('Visible')).toBeInTheDocument();
  });

  it('hides when clicking outside the ref element', () => {
    const { queryByText } = render(<TestComponent initialVisible={true} />);

    // simulate click outside
    fireEvent.click(document.body);

    // now "Visible" should be gone
    expect(queryByText('Visible')).not.toBeInTheDocument();
    expect(queryByText('Hidden')).toBeInTheDocument();
  });

  it('does NOT hide when clicking inside the ref element', () => {
    const { getByTestId, getByText } = render(<TestComponent initialVisible={true} />);

    const inside = getByTestId('inside');
    fireEvent.click(inside);

    // Should remain visible
    expect(getByText('Visible')).toBeInTheDocument();
  });
});
