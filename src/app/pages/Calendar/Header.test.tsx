import { render, screen, waitFor } from '@testing-library/react';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import userEvent from '@testing-library/user-event';

import Header from './Header';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
}));

describe('Header', () => {
  const testComponent = () => {
    return (
      <ThemeProvider theme={GreyGooseTheme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('should render the component', () => {
    render(testComponent());
    expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText("Here's what you planned")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'New Shift' }),
    ).toBeInTheDocument();
  });

  it('should navigate to create shift page when new shift button is clicked', async () => {
    render(testComponent());
    userEvent.click(screen.getByRole('button', { name: 'New Shift' }));
    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/create-shift');
    });
  });

  it('should render the home breadcrumb as a link', () => {
    render(testComponent());
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should render the calendar breadcrumb as text', () => {
    render(testComponent());
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
});
