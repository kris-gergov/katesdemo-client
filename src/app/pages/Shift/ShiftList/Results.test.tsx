import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import userEvent from '@testing-library/user-event';

import Results from './Results';
import { exampleShiftList } from 'app/features/calendar/calendarSlice.test-data';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { ShiftType } from 'types/shift-type';

describe('Results table', () => {
  const user = userEvent.setup();
  const deleteFn = jest.fn();

  interface TestProps {
    shifts: ShiftType[];
    deleteShift: () => Promise<void>;
  }

  const testProps: TestProps = {
    shifts: exampleShiftList,
    deleteShift: deleteFn,
  };

  const testComponent = (overrideProps?: Partial<TestProps>) => {
    if (overrideProps)
      return (
        <ThemeProvider theme={GreyGooseTheme}>
          <BrowserRouter>
            <Results {...testProps} {...overrideProps} />
          </BrowserRouter>
        </ThemeProvider>
      );

    return (
      <ThemeProvider theme={GreyGooseTheme}>
        <BrowserRouter>
          <Results {...testProps} />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    render(testComponent());

    expect(
      screen.getAllByText(exampleShiftList[0].cleaner.name)[0],
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleShiftList[1].paymentMethod),
    ).toBeInTheDocument();
  });

  it('executes the correct delete fn', async () => {
    render(testComponent());

    user.click(screen.getAllByTestId('delete-shift-button')[0]);

    await waitFor(() => expect(deleteFn).toHaveBeenCalledTimes(1));
  });

  it('changes to the appropriate URL on edit', async () => {
    render(testComponent());

    user.click(screen.getAllByTestId('edit-shift-button')[0]);

    await waitFor(() =>
      expect(global.window.location.pathname).toContain('create-shift'),
    );
  });
});
