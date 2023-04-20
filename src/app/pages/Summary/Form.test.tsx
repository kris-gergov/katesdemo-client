import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import { exampleUserList } from 'app/features/calendar/calendarSlice.test-data';
import { UserType } from 'types/user-type';
import { SummaryType } from 'types/shift-type';
import Form from './Form';

describe('Summary form', () => {
  const user = userEvent.setup();

  const submitMock = jest.fn();
  const testClient = exampleUserList[0];
  const testCleaner = exampleUserList[1];
  const fromDate = '01/01/2023 12:00';
  const toDate = '01/01/2023 18:00';

  interface TestProps {
    users: UserType[];
    submitSummary: () => Promise<SummaryType>;
  }

  const testProps: TestProps = {
    users: exampleUserList,
    submitSummary: submitMock,
  };

  const testComponent = (overrideProps?: Partial<TestProps>) => {
    if (overrideProps)
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
            <BrowserRouter>
              <Form {...testProps} {...overrideProps} />
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      );

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
          <BrowserRouter>
            <Form {...testProps} />
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    );
  };

  it('should render correctly', async () => {
    render(testComponent());

    expect(screen.getByText(exampleUserList[0].name)).toBeInTheDocument(); // client
    expect(screen.getByText(exampleUserList[1].name)).toBeInTheDocument(); // cleaner
  });

  it('should call on submit correctly', async () => {
    render(testComponent());

    user.selectOptions(
      screen.getByTestId('summary-cleaner-dropdown'),
      testCleaner.name,
    );
    user.selectOptions(
      screen.getByTestId('summary-client-dropdown'),
      testClient.name,
    );

    fireEvent.change(screen.getByLabelText('From date'), {
      target: { value: fromDate },
    });

    fireEvent.change(screen.getByLabelText('To date'), {
      target: { value: toDate },
    });

    user.click(screen.getByText(/Run/i));

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalledWith({
        client: testClient._id,
        cleaner: testCleaner._id,
        from: fromDate,
        to: toDate,
      }),
    );
  });
});
