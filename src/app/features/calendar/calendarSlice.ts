/*PayloadAction is for typings */
import {
  createSlice,
  ThunkAction,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store/reducers';
import { EventType } from 'types/calendar-type';
import axios, { EndPoints } from 'app/api/axios';
import { getShiftAxios, updateShiftAxios } from 'app/services/shiftService';
import { addHours } from 'utils/date';

/*typings for the Thunk actions to give us intlelli-sense */
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

/*Shape or types of our CalendarState */
export interface CalendarState {
  events: EventType[];
  isModalOpen: boolean;
  selectedEventId?: string; //nullable
  selectedRange?: {
    //nullable
    start: number;
    end: number;
  };
  loading: boolean; //useful for showing spinner or loading screen
  error: string;
}

/*initialState is type-safe, and it must be of a calendar state type.
 It also means that you can't add any other types here that are not part
of the calendar state we’ve already defined. */
const initialState: CalendarState = {
  events: [],
  isModalOpen: false,
  selectedEventId: undefined,
  selectedRange: undefined,
  loading: false,
  error: '',
};

const calendarNamespace = 'calendar';
/*Single-File implementation of Redux-Toolkit*/

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: calendarNamespace,

  /*initialState is the default value of this namespace/module and it is required.*/

  initialState, // same as initialState: initialState

  /*reducers -- for synchronous actions. It does not require Axios.*/
  /* the state here refers to the CalendarState */
  reducers: {
    createEvent(state, action: PayloadAction<EventType>) {
      state.events.push(action.payload);
    },
    selectEvent(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.selectedEventId = action.payload;
    },
    updateEvent(
      state,
      action: PayloadAction<{ id: string; date: Date; hours: number }>,
    ) {
      const index = state.events.findIndex(e => e.id === action.payload.id);

      state.events[index].extendedProps.paymentDate = action.payload.date;
      state.events[index].start = action.payload.date;
      state.events[index].end = addHours(
        action.payload.hours,
        action.payload.date,
      );
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    /*{start: number; end: number} - this is the shape of the model that we
     can define here right away, although we can also write it separately in
     the models' folder. */
    selectRange(state, action: PayloadAction<{ start: number; end: number }>) {
      /*deconstructing the payload */
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = {
        start,
        end,
      };
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedEventId = undefined;
      state.selectedRange = undefined;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },
  },
});

/* Export these actions so components can use them. Non-asynchronous
actions. HTTP client is not needed. */
export const selectEvent =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(slice.actions.selectEvent(id));
  };

export const selectRange =
  (start: Date, end: Date): AppThunk =>
  dispatch => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      }),
    );
  };

export const openModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.openModal());
};

export const closeModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.closeModal());
};

/* Asynchronous actions. Actions that require Axios (HTTP client)
 or any APIs of a library or function that returns a promise. */
export const getEvents = (): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  dispatch(slice.actions.setError(''));
  try {
    const { data } = await getShiftAxios();
    const events: EventType[] = data.shifts.map(shift => {
      return {
        allDay: false,
        description: shift.notes || '',
        start: new Date(shift.date),
        end: addHours(shift.hours, new Date(shift.date)),
        id: shift._id,
        title: `${shift.client.name} - ${shift.cleaner.name}`,
        extendedProps: {
          cleaner: shift.cleaner,
          client: shift.client,
          commission: shift.commission,
          createdAt: shift.createdAt,
          hours: shift.hours,
          paid: shift.paid,
          paymentDate: shift.paymentDate,
          paymentMethod: shift.paymentMethod,
          updatedAt: shift.updatedAt,
          amount: shift.amount,
          notes: shift.notes,
        },
      };
    });
    dispatch(slice.actions.getEvents(events));
  } catch (err: any) {
    console.log(err.message);
    dispatch(slice.actions.setError(err.message));
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};

export const createEvent =
  (event: EventType): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true));
    dispatch(slice.actions.setError(''));
    try {
      /* data – we deconstructed the response object */
      //const { data } = await axios.post<EventType>(EndPoints.events, event);
      // dispatch(slice.actions.createEvent(data));
    } catch (err: any) {
      console.log(err.message);
      dispatch(slice.actions.setError(err.message));
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };

export const updateEvent =
  (update: EventType): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true));
    dispatch(slice.actions.setError(''));

    try {
      /* updating the state in the database */
      const { data } = await updateShiftAxios(update.id, {
        date: update.start,
      });

      /* updating the state in the UI
      dispatch(
        slice.actions.updateEvent({
          date: update.start,
          id: update.id,
          hours: data.shift.hours,
        }), 
      ); */
    } catch (err: any) {
      console.log(err.message);
      dispatch(slice.actions.setError(err.message));
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };

export const deleteEvent =
  (id?: string): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true));
    dispatch(slice.actions.setError(''));
    if (!id) return;
    try {
      await axios.delete(`${EndPoints.shifts}/${id}`);
      dispatch(slice.actions.deleteEvent(id));
    } catch (err: any) {
      console.log(err.message);
      dispatch(slice.actions.setError(err.message));
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };

export default slice.reducer;
