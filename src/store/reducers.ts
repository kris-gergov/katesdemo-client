/* Combine all reducers in this file and export the combined reducers.
combineReducers - turns an object whose values are different reducer
functions into a single reducer function. */
import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from 'app/features/calendar/calendarSlice';
import profileReducer from 'app/features/profile/profileSlice';
import authReducer from 'app/features/auth/authSlice';

/* injectedReducers - an easier way of registering a reducer */
const injectedReducers = {
  calendar: calendarReducer,
  profile: profileReducer,
  auth: authReducer,
};

/* combineReducers requires an object.we're using the spread operator (...
injectedReducers) to spread out all the Reducers */
const rootReducer = combineReducers({
  ...injectedReducers,
});

/* RooState is the type or shape of the combinedReducer easier way of
getting all the types from this rootReduder instead of mapping it one
by one. RootState - we can use the Selector to give us intelli-sense in
building our components. */
export type RootState = ReturnType<typeof rootReducer>;
export const createReducer = () => rootReducer;
