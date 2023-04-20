import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { ThemeProvider } from '@mui/material';
import menuItems from './items';
import SidebarMenu from './';

describe('SidebarMenu', () => {
  it('should render the correct subheaders', () => {
    render(
      <ThemeProvider theme={GreyGooseTheme}>
        <BrowserRouter>
          <SidebarMenu opened />
        </BrowserRouter>
      </ThemeProvider>,
    );

    for (const item of menuItems) {
      expect(screen.getByText(item.heading)).toBeInTheDocument();
    }
  });
});
