import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import {
  exampleCreateShift,
  exampleUserList,
} from 'app/features/calendar/calendarSlice.test-data';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import { CreateShiftType } from 'types/shift-type';
import { UserType } from 'types/user-type';

describe('Shift create form', () => {
  const user = userEvent.setup();
  const submitMock = jest.fn();

  interface TestProps {
    existingShift: CreateShiftType | null;
    existingShiftId: string | null;
    users: UserType[];
    submitShift: () => {};
  }

  const testProps: TestProps = {
    existingShift: null,
    existingShiftId: null,
    users: exampleUserList,
    submitShift: submitMock,
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

  it('should render correctly when creating a shift', async () => {
    render(testComponent());

    const fields = [
      'Cleaner',
      'Client',
      'Hours',
      'Amount (£)',
      'Shift is paid',
      'Payment method',
      'Commission (£)',
    ];

    for (const field of fields) {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    }
    expect(screen.getByText(exampleUserList[0].name)).toBeInTheDocument();
    expect(screen.getByText(exampleUserList[1].name)).toBeInTheDocument();
  });

  it('should render correctly when editing a shift', async () => {
    render(
      testComponent({
        existingShift: exampleCreateShift,
        existingShiftId: 'test-id-123',
      }),
    );

    expect(
      screen.getByDisplayValue(exampleCreateShift.hours),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(exampleCreateShift.commission),
    ).toBeInTheDocument();
  });

  it('should validate correctly', async () => {
    render(testComponent());

    const input = screen.getByLabelText('Client');
    fireEvent.blur(input);

    user.click(screen.getByRole('button', { name: /Create shift/i }));

    await waitFor(() => {
      expect(screen.getByText('Client is required')).toBeInTheDocument();
    });
  });

  it('should submit successfully with valid values', async () => {
    render(
      testComponent({
        existingShift: exampleCreateShift,
        existingShiftId: 'test-id-123',
      }),
    );

    user.click(screen.getByRole('button', { name: /Save shift/i }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith({
        ...exampleCreateShift,
        notes: '<p>n/a</p>', // quill formatting
      });
    });
  });
});
