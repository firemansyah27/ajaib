import { configureStore } from '@reduxjs/toolkit';
import { apiUsersSlice } from '../features/apiUsersSlice';

export const store = configureStore({
  reducer: {
    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiUsersSlice.middleware,
      );
  },
});
