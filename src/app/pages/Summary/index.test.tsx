import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import { exampleUserList } from 'app/features/calendar/calendarSlice.test-data';
import * as shiftService from 'app/services/shiftService';
import Summary from './';
import userEvent from '@testing-library/user-event';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Summary page title</>,
  HelmetProvider: () => jest.fn(),
}));

const getUsersAxios: jest.Mock =
  require('app/services/userService').getUsersAxios;
jest.mock('app/services/userService', () => ({
  getUsersAxios: jest.fn(),
}));

describe('Summary page', () => {
  const user = userEvent.setup();

  const testComponent = () => {
    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <SnackbarProvider
          dense
          autoHideDuration={2500}
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          preventDuplicate
        >
          <ThemeProvider theme={GreyGooseTheme}>
            <BrowserRouter>
              <Summary />
            </BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    getUsersAxios.mockResolvedValue({
      data: {
        users: exampleUserList,
      },
    });
  });

  it('renders the correct fields', async () => {
    render(testComponent());

    const fields = ['Cleaner', 'Client', 'From date', 'To date'];

    for (const field of fields) {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    }
  });

  it('renders the dropdown users', async () => {
    render(testComponent());

    await waitFor(() =>
      expect(screen.queryByText(exampleUserList[0].name)).toBeInTheDocument(),
    );
    expect(screen.queryByText(exampleUserList[1].name)).toBeInTheDocument();
  });

  it('makes the appropriate service call to get the users', async () => {
    render(testComponent());

    expect(getUsersAxios).toHaveBeenCalledTimes(1);
  });

  it('makes the appropriate service call onSubmit', async () => {
    const mockPostSummary = jest.fn().mockResolvedValue({
      data: {
        num: 5,
        commission: 4,
        range: 'testrange',
        outstanding: 3,
        amount: 1,
      },
    });
    (shiftService.postShiftSummaryAxios as jest.Mock) = mockPostSummary;
    const testClient = exampleUserList[0];
    const testCleaner = exampleUserList[1];
    const fromDate = '01/01/2023 12:00';
    const toDate = '01/01/2023 18:00';

    render(testComponent());

    await waitFor(() =>
      user.selectOptions(
        screen.getByTestId('summary-cleaner-dropdown'),
        testCleaner.name,
      ),
    );
    await waitFor(() =>
      user.selectOptions(
        screen.getByTestId('summary-client-dropdown'),
        testClient.name,
      ),
    );

    fireEvent.change(screen.getByLabelText('From date'), {
      target: { value: fromDate },
    });

    fireEvent.change(screen.getByLabelText('To date'), {
      target: { value: toDate },
    });

    user.click(screen.getByText(/Run/i));

    await waitFor(() => expect(mockPostSummary).toHaveBeenCalledTimes(1));
  });
});
