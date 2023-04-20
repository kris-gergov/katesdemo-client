import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { exampleShiftList } from 'app/features/calendar/calendarSlice.test-data';
import * as shiftService from 'app/services/shiftService';
import ShiftList from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Shift list title</>,
  HelmetProvider: () => jest.fn(),
}));

describe('Shift list page', () => {
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
            <ShiftList />
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
    let mockGetShiftAxios;
    beforeEach(() => {
      mockGetShiftAxios = jest.fn().mockResolvedValue({
        data: {
          shifts: exampleShiftList,
        },
      });
      (shiftService.getShiftAxios as jest.Mock) = mockGetShiftAxios;
    });

    it('renders correctly', async () => {
      render(testComponent());

      await waitFor(() =>
        expect(
          screen.queryByText(exampleShiftList[0].paymentMethod),
        ).toBeInTheDocument(),
      );
      expect(
        screen.queryAllByText(exampleShiftList[1].cleaner.name)[0],
      ).toBeInTheDocument();
    });

    it('calls the appropriate service function', async () => {
      render(testComponent());
      expect(mockGetShiftAxios).toHaveBeenCalledTimes(1);
    });
  });
});
