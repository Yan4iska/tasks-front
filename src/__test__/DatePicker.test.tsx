import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker';
import { render, screen, fireEvent } from '@testing-library/react';

import dayjs from 'dayjs';

describe('DatePicker', () => {
  it('renders placeholder when no value', () => {
    render(<DatePicker value="" onChange={jest.fn()} />);
    expect(screen.getByText('Click for select')).toBeInTheDocument();
  });

  it('renders formatted date when value is passed', () => {
    const date = new Date().toISOString();
    render(<DatePicker value={date} onChange={jest.fn()} />);
    expect(screen.getByText(dayjs(date).format('LL'))).toBeInTheDocument();
  });

  it('calls onChange with empty string on clear', () => {
    const mockChange = jest.fn();
    const date = new Date().toISOString();
    render(<DatePicker value={date} onChange={mockChange} />);
    fireEvent.click(screen.getByRole('button', { name: '' })); // крестик без текста
    expect(mockChange).toHaveBeenCalledWith('');
  });

  it('opens calendar on button click', () => {
    render(<DatePicker value="" onChange={jest.fn()} />);
    fireEvent.click(screen.getByText('Click for select'));
    expect(document.querySelector('.rdp')).toBeInTheDocument(); // .rdp — класс DayPicker
  });
});
