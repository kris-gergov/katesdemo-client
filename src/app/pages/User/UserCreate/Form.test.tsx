import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

import { exampleCreateUser } from 'app/features/calendar/calendarSlice.test-data';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import { CreateUserType } from 'types/user-type';

describe('Shift create form', () => {
  const user = userEvent.setup();
  const submitMock = jest.fn();

  interface TestProps {
    existingUser: CreateUserType | null;
    existingUserId: string | null;
    submitUser: () => Promise<void>;
  }

  const testProps: TestProps = {
    existingUser: null,
    existingUserId: null,
    submitUser: submitMock,
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

  it('should render the appropriate fields', async () => {
    render(testComponent());
    const fields = [
      'Email',
      'Name',
      'Type',
      'Phone',
      'Deposit (£)',
      'City',
      'Street',
      'Post code',
    ];

    for (const field of fields) {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    }
  });

  it('should render correctly when editing a user', async () => {
    render(
      testComponent({
        existingUser: exampleCreateUser,
        existingUserId: 'test-id-123',
      }),
    );

    expect(
      screen.getByDisplayValue(exampleCreateUser.email),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(exampleCreateUser.name),
    ).toBeInTheDocument();
  });

  it('should validate correctly', async () => {
    render(testComponent());

    const input = screen.getByLabelText('Email');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should submit successfully with valid values', async () => {
    render(
      testComponent({
        existingUser: exampleCreateUser,
        existingUserId: 'test-id-123',
      }),
    );

    user.click(screen.getByRole('button', { name: /Save user/i }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith(exampleCreateUser);
      expect(submitMock).toHaveBeenCalledTimes(1);
    });
  });
});
