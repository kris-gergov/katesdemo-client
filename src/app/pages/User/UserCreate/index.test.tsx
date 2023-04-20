import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import UserCreate from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>User create title</>,
  HelmetProvider: () => jest.fn(),
}));

describe('User create page', () => {
  it('renders correctly', () => {
    render(
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
              <UserCreate />
            </BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>,
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create user' }),
    ).toBeInTheDocument();
  });
});
