/*Create the store with dynamic reducers */
import { configureStore } from '@reduxjs/toolkit';
import { forceReducerReload } from 'redux-injectors';
import { createReducer } from './reducers';

export function configureAppStore() {
  const store = configureStore({
    /*reducer is required. middleware, devTools, and the rest are optional */
    reducer: createReducer(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),

    devTools: process.env.NODE_ENV !== 'production',
  });

  /* Make reducers hot reloadable, see http://mxs.is/googmo istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }
  return store;
}
