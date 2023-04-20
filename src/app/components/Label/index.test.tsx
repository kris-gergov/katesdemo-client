import { render, screen } from '@testing-library/react';
import { GreyGooseTheme } from 'styles/themes/customTheme';
import { ThemeProvider } from '@mui/material';
import Label, { LabelColor } from './';

describe('Label', () => {
  const testComponent = (overrideProps?: { color: LabelColor }) => {
    if (overrideProps)
      return (
        <ThemeProvider theme={GreyGooseTheme}>
          <Label {...overrideProps}>Test</Label>
        </ThemeProvider>
      );

    return (
      <ThemeProvider theme={GreyGooseTheme}>
        <Label>Test</Label>
      </ThemeProvider>
    );
  };

  it('should render the children', () => {
    render(testComponent());
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render the default color', () => {
    render(testComponent());
    expect(screen.getByTestId('label')).toHaveStyle(
      'color: rgb(110, 117, 159)',
    );
  });

  it('should render the primary color', () => {
    render(testComponent({ color: 'primary' }));
    expect(screen.getByTestId('label')).toHaveStyle('color: rgb(36, 66, 175)');
  });

  it('should render the secondary color', () => {
    render(testComponent({ color: 'secondary' }));
    expect(screen.getByTestId('label')).toHaveStyle(
      'color: rgb(110, 117, 159)',
    );
  });

  it('should render the error color', () => {
    render(testComponent({ color: 'error' }));
    expect(screen.getByTestId('label')).toHaveStyle('color: rgb(255, 25, 67)');
  });
});
