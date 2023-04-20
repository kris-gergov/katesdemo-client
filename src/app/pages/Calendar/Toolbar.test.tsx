import { render, screen, waitFor } from '@testing-library/react';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Toolbar from './Toolbar';
import userEvent from '@testing-library/user-event';
import { ViewType } from 'types/calendar-type';

describe('Toolbar component', () => {
  const user = userEvent.setup();

  const testDate = new Date('2022-03-25');
  const addClick = jest.fn();
  const dateNext = jest.fn();
  const datePrev = jest.fn();
  const dateToday = jest.fn();
  const viewChange = jest.fn();

  interface TestProps {
    date: Date;
    view: ViewType;
    onAddClick: () => {};
    onDateNext: () => {};
    onDatePrev: () => {};
    onDateToday: () => {};
    onViewChange: () => {};
  }

  const testProps: TestProps = {
    date: testDate,
    view: 'listWeek',
    onAddClick: addClick,
    onDateNext: dateNext,
    onDatePrev: datePrev,
    onDateToday: dateToday,
    onViewChange: viewChange,
  };

  const testComponent = (overrideProps?: TestProps) => {
    if (overrideProps)
      return (
        <ThemeProvider theme={GreyGooseTheme}>
          <BrowserRouter>
            <Toolbar {...testProps} {...overrideProps} />
          </BrowserRouter>
        </ThemeProvider>
      );

    return (
      <ThemeProvider theme={GreyGooseTheme}>
        <BrowserRouter>
          <Toolbar {...testProps} />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(testComponent());

    expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls the appropriate prev function', async () => {
    render(testComponent());

    user.click(screen.getByRole('button', { name: 'Prev' }));

    await waitFor(() => expect(datePrev).toHaveBeenCalledTimes(1));
  });

  it('calls the appropriate today function', async () => {
    render(testComponent());

    user.click(screen.getByRole('button', { name: 'Today' }));

    await waitFor(() => expect(dateToday).toHaveBeenCalledTimes(1));
  });

  it('calls the appropriate next function', async () => {
    render(testComponent());

    user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(dateNext).toHaveBeenCalledTimes(1));
  });
});
