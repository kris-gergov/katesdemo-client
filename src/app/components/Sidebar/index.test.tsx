import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import { SidebarProvider } from 'app/contexts/SidebarContext';
import { ROUTES } from 'app/constants';
import Sidebar from './';

const createRouterWrapper =
  history =>
  ({ children }) =>
    (
      <SidebarProvider>
        <ThemeProvider theme={GreyGooseTheme}>
          <Router history={history}>{children}</Router>
        </ThemeProvider>
      </SidebarProvider>
    );

describe('Sidebar', () => {
  const user = userEvent.setup();
  const history = createMemoryHistory();

  it('opens the drawer upon button click', async () => {
    render(<Sidebar />, { wrapper: createRouterWrapper(history) });

    expect(screen.queryByText('Calendar')).not.toBeInTheDocument();
    const button = screen.getByLabelText('open drawer');
    expect(button).toBeInTheDocument();
    user.click(button);

    await waitFor(
      () => {
        expect(screen.getByLabelText('close drawer')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
      },
      {
        timeout: 500,
      },
    ); // timeout needed to open menu
  });

  it('closes the drawer upon button click', async () => {
    render(<Sidebar />, { wrapper: createRouterWrapper(history) });

    user.click(screen.getByLabelText('open drawer'));
    await waitFor(() => user.click(screen.getByLabelText('close drawer')), {
      timeout: 500,
    }); // timeout needed to open menu
    await waitFor(
      () => {
        expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
      },
      {
        timeout: 500,
      },
    ); // timeout needed to close menu
  });

  it('navigates the drawer upon link click', async () => {
    render(<Sidebar />, { wrapper: createRouterWrapper(history) });

    const button = screen.getByLabelText('open drawer');
    expect(button).toBeInTheDocument();
    user.click(button);
    await waitFor(() => user.click(screen.getByText('Calendar')), {
      timeout: 500,
    }); // timeout needed to open menu
    expect(history.location.pathname).toBe(ROUTES.CALENDAR);
  });
});
