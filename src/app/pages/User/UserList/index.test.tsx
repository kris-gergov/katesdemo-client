import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { exampleUserList } from 'app/features/calendar/calendarSlice.test-data';
import * as userService from 'app/services/userService';
import UserList from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>User list title</>,
  HelmetProvider: () => jest.fn(),
}));

describe('User list page', () => {
  const testComponent = () => {
    return (
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
            <UserList />
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading when no data is present', async () => {
    render(testComponent());
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  describe('with data', () => {
    let mockGetUserAxios;
    beforeEach(() => {
      mockGetUserAxios = jest.fn().mockResolvedValue({
        data: {
          users: exampleUserList,
        },
      });
      (userService.getUsersAxios as jest.Mock) = mockGetUserAxios;
    });

    it('renders correctly', async () => {
      render(testComponent());

      await waitFor(() =>
        expect(screen.queryByText(exampleUserList[0].name)).toBeInTheDocument(),
      );

      expect(
        screen.queryAllByText(exampleUserList[1].name)[0],
      ).toBeInTheDocument();
    });

    it('calls the appropriate service function', async () => {
      render(testComponent());

      expect(mockGetUserAxios).toHaveBeenCalledTimes(1);
    });
  });
});
