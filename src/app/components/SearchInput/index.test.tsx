import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './';

describe('SearchInput', () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  const testProps = {
    onChangeSearchQuery: onChange,
    placeholder: 'Test placeholder',
  };

  const testComponent = (overrideProps?: {
    onChangeSearchQuery: () => {};
    placeholder: string;
  }) => {
    if (overrideProps) return <SearchInput {...testProps} {...overrideProps} />;

    return <SearchInput {...testProps} />;
  };

  it('should render correctly', () => {
    render(testComponent());

    const inputEl = screen.getByTestId('search-input');

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');
  });

  it('should call the onChange prop when typing', async () => {
    render(testComponent());

    const inputEl = screen.getByTestId('search-input') as HTMLInputElement;
    user.type(inputEl, 'test');

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1), {
      timeout: 700,
    }); // timeout needed for useDebounce
  });
});
