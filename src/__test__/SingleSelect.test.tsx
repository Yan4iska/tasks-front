// src/__tests__/SingleSelect.test.tsx
import { IOption, SingleSelect } from '@/components/ui/task-edit/SingleSelect/SingleSelect';
import { render, screen, fireEvent } from '@testing-library/react';

const options: IOption[] = [
  { label: 'Option 1', value: 'gray' },
  { label: 'Option 2', value: 'high' },
  { label: 'Option 3', value: '#ff0000' }, // пример кастомного цвета
];

describe('SingleSelect', () => {
  it('рендерит выбранное значение', () => {
    render(<SingleSelect data={options} value="gray" onChange={jest.fn()} />);
    expect(screen.getByText('gray')).toBeInTheDocument();
  });

  it('рендерит placeholder, если value пустое', () => {
    render(<SingleSelect data={options} value="" onChange={jest.fn()} />);
    expect(screen.getByText(/Click for select/i)).toBeInTheDocument();
  });

  it('открывает и закрывает дропдаун по клику', () => {
    render(<SingleSelect data={options} value="" onChange={jest.fn()} />);

    const button = screen.getByRole('button', { name: /Click for select/i });
    // Вначале дропдаун отсутствует
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // Клик — открываем
    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    // Клик — закрываем
    fireEvent.click(button);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('вызывает onChange и закрывает дропдаун при выборе опции', () => {
    const onChange = jest.fn();
    render(<SingleSelect data={options} value="" onChange={onChange} />);

    // Открываем
    fireEvent.click(screen.getByRole('button', { name: /Click for select/i }));

    // Выбираем опцию
    fireEvent.click(screen.getByText('Option 2'));

    expect(onChange).toHaveBeenCalledWith('high');
    // Проверяем, что дропдаун закрылся
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
