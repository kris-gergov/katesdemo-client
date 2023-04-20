import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import { exampleUserList } from 'app/features/calendar/calendarSlice.test-data';
import ShiftCreate from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Shift create title</>,
  HelmetProvider: () => jest.fn(),
}));

const getUsersAxios: jest.Mock =
  require('app/services/userService').getUsersAxios;
jest.mock('app/services/userService', () => ({
  getUsersAxios: jest.fn(),
}));

describe('Shift create page', () => {
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
              <ShiftCreate />
            </BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all necessary elements', async () => {
    getUsersAxios.mockResolvedValue({
      data: {
        users: exampleUserList,
      },
    });

    render(testComponent());

    await waitFor(() =>
      expect(screen.queryAllByText('Create shift')[0]).toBeInTheDocument(),
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create shift' }),
    ).toBeInTheDocument();
  });

  it('renders the user dropdowns correctly', async () => {
    getUsersAxios.mockResolvedValue({
      data: {
        users: exampleUserList,
      },
    });

    render(testComponent());

    await waitFor(() =>
      expect(screen.queryByText(exampleUserList[0].name)).toBeInTheDocument(),
    );
    expect(screen.queryByText(exampleUserList[1].name)).toBeInTheDocument();
  });

  it('renders the spinner while loading data', async () => {
    render(testComponent());
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
