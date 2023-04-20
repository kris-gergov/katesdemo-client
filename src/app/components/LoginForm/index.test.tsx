import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from 'app/components/LoginForm';

describe('LoginForm', () => {
  const user = userEvent.setup();

  const onSubmit = jest.fn();

  const testProps = {
    onSubmit,
  };

  const testComponent = (overrideProps?: { onSubmit: () => {} }) => {
    if (overrideProps) return <LoginForm {...testProps} {...overrideProps} />;

    return <LoginForm {...testProps} />;
  };

  it('should render the email input', () => {
    render(testComponent());
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('should render the password input', () => {
    render(testComponent());
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(testComponent());
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call the appropriate onSubmit method', async () => {
    render(testComponent());

    user.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');
    user.type(screen.getByLabelText(/password/i), 'Dee');

    user.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should validate correctly', async () => {
    render(testComponent());

    // Clear default values
    user.clear(screen.getByLabelText(/email/i));
    user.clear(screen.getByLabelText(/password/i));

    user.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0));
  });

  it('should render the error message', async () => {
    render(testComponent());
    user.type(screen.getByLabelText('Email Address'), 'test@gmail.com');
    user.type(screen.getByLabelText('Password'), 'password');
    user.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Failed. Please try again.')).toBeInTheDocument(),
    );
  });
});
