import { render, screen } from '@testing-library/react';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { ThemeProvider } from '@mui/material';
import NotFound from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Not Found title</>,
  HelmetProvider: () => jest.fn(),
}));

describe('NotFound', () => {
  const testComponent = () => {
    return (
      <ThemeProvider theme={GreyGooseTheme}>
        <NotFound />
      </ThemeProvider>
    );
  };
  it('should render the title', () => {
    render(testComponent());
    expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
  });

  it('should render the helmet title', () => {
    render(testComponent());
    expect(screen.getByText('Not Found title')).toBeInTheDocument();
  });

  it('should render the header', () => {
    render(testComponent());
    expect(
      screen.getByRole('heading', { name: '404 - Page not found' }),
    ).toBeInTheDocument();
  });
});
