import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import jwtDecode from 'jwt-decode';

import Login from './Login';
import { AuthStateType } from 'app/features/auth/authSlice';
import { Provider } from 'react-redux';

const middlewares = [];
const mockStore = configureStore(middlewares);

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => jest.fn(),
  HelmetProvider: () => jest.fn(),
}));

const loginAxios: jest.Mock = require('app/services/authService').loginAxios;
jest.mock('app/services/authService', () => ({
  loginAxios: jest.fn(),
}));

jest.mock('jwt-decode', () => jest.fn());

describe('Login page', () => {
  let store;

  const testComponent = () => {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const defaultValue: AuthStateType = {
      accessToken: '',
      claims: undefined,
    };

    store = mockStore(defaultValue);
  });

  it('should render correctly', async () => {
    render(testComponent());

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('saves the access token to local storage', async () => {
    const accessToken = 'test-access-token';
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    loginAxios.mockResolvedValue({ data: { accessToken } });

    render(testComponent());

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('token', accessToken);
    });
  });

  it('dispatches the decoded token to the Redux store', async () => {
    const accessToken = 'test-access-token';
    const decodedToken = {
      email: 'test@example.com',
      iat: 1647728529,
      exp: 1647814929,
      sub: '1234567890',
    };
    loginAxios.mockResolvedValue({ data: { accessToken } });
    (jwtDecode as jest.Mock).mockImplementationOnce(() => decodedToken);

    render(testComponent());

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        { type: 'auth/saveTokenAction', payload: accessToken },
        { type: 'auth/saveClaimsAction', payload: decodedToken },
      ]);
    });
  });
});
