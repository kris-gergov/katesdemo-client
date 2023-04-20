import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import { exampleSummaryResults } from 'app/features/calendar/calendarSlice.test-data';
import Results from './Results';

describe('Summary results component', () => {
  it('renders correctly with valid data', async () => {
    render(
      <ThemeProvider theme={GreyGooseTheme}>
        <BrowserRouter>
          <Results data={exampleSummaryResults} />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(
      screen.getByText(`£${exampleSummaryResults.amount}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleSummaryResults.outstanding}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleSummaryResults.commission}`),
    ).toBeInTheDocument();
  });
});
