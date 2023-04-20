import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AddEditEventForm from './AddEditEventForm';
import { exampleEvent } from 'app/features/calendar/calendarSlice.test-data';
import { EventType } from 'types/calendar-type';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Calendar title</>,
  HelmetProvider: () => jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Event Modal', () => {
  const user = userEvent.setup();

  const onDelete = jest.fn();
  const onCancel = jest.fn();

  const store = mockStore({});

  interface TestProps {
    event: EventType;
    onCancel: () => {};
    onDeleteComplete: () => {};
  }

  const testProps: TestProps = {
    event: exampleEvent,
    onCancel: onCancel,
    onDeleteComplete: onDelete,
  };

  const testComponent = (overrideProps?: TestProps) => {
    if (overrideProps)
      return (
        <Provider store={store}>
          <BrowserRouter>
            <AddEditEventForm {...testProps} {...overrideProps} />
          </BrowserRouter>
        </Provider>
      );

    return (
      <Provider store={store}>
        <BrowserRouter>
          <AddEditEventForm {...testProps} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render the correct labels', async () => {
    render(testComponent());

    const fields = [
      'Cleaner',
      'Client',
      'Hours',
      'Amount',
      'Paid',
      'Payment method',
      'Commission',
    ];

    for (const field of fields) {
      expect(screen.getByText(field)).toBeInTheDocument();
    }

    expect(
      screen.getByText(
        `Shift on ${new Date(exampleEvent.start).toUTCString()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.cleaner.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.client.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.hours),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleEvent.extendedProps.amount!}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.paymentMethod),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleEvent.extendedProps.commission}`),
    ).toBeInTheDocument();
  });

  it('should render the event data', async () => {
    render(testComponent());

    expect(
      screen.getByText(
        `Shift on ${new Date(exampleEvent.start).toUTCString()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.cleaner.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.client.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.hours),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleEvent.extendedProps.amount!}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(exampleEvent.extendedProps.paymentMethod),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`£${exampleEvent.extendedProps.commission}`),
    ).toBeInTheDocument();
  });

  it('should run the appropriate delete function', async () => {
    render(testComponent());

    user.click(screen.getByTestId('delete-event-button'));

    await waitFor(() => expect(onDelete).toHaveBeenCalledTimes(1));
  });

  it('should run the appropriate cancel function', async () => {
    render(testComponent());

    user.click(screen.getByTestId('cancel-button'));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  it('should change to the appropriate url with correct state when Edit is clicked', async () => {
    render(testComponent());

    user.click(screen.getByTestId('edit-event-button'));

    await waitFor(() =>
      expect(global.window.location.pathname).toContain('create-shift'),
    );
    expect(global.window.history.state).toEqual(
      expect.objectContaining({
        state: expect.objectContaining({
          shift: expect.objectContaining({
            cleaner: exampleEvent.extendedProps.cleaner.id,
            hours: exampleEvent.extendedProps.hours,
          }),
        }),
      }),
    );
  });
});
