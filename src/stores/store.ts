import {configureStore} from '@reduxjs/toolkit';
import {orderApi} from './services/orderApi';

export const store = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
