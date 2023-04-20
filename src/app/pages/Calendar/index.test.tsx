import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import { GreyGooseTheme } from 'styles/themes/customTheme';
import { CalendarState } from 'app/features/calendar/calendarSlice';
import { exampleEventList } from 'app/features/calendar/calendarSlice.test-data';
import Calendar from './';

/**
 * Mock helmet module
 */
jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Calendar title</>,
  HelmetProvider: () => jest.fn(),
}));

const getShiftAxios: jest.Mock =
  require('app/services/shiftService').getShiftAxios;
jest.mock('app/services/shiftService', () => ({
  getShiftAxios: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Calendar page', () => {
  const defaultValue: { calendar: CalendarState } = {
    calendar: {
      events: exampleEventList,
      isModalOpen: false,
      selectedEventId: undefined,
      selectedRange: undefined,
      loading: false,
      error: '',
    },
  };

  const testComponent = (storeValue?: { calendar: CalendarState }) => {
    let store;
    if (storeValue) {
      store = mockStore(storeValue);
    } else {
      store = mockStore(defaultValue);
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={GreyGooseTheme}>
          <BrowserRouter>
            <Calendar />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    getShiftAxios.mockResolvedValue({
      data: {
        shifts: [],
      },
    });
  });

  it('should render correctly', async () => {
    render(testComponent());

    expect(screen.getByText(exampleEventList[0].title)).toBeInTheDocument();
  });

  it('should render the modal for a selected event', async () => {
    const storeValue = {
      calendar: {
        events: exampleEventList,
        isModalOpen: true,
        selectedEventId: exampleEventList[1].id,
        selectedRange: undefined,
        loading: false,
        error: '',
      },
    };

    render(testComponent(storeValue));

    expect(
      screen.getByText(exampleEventList[1].extendedProps.paymentMethod),
    ).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
