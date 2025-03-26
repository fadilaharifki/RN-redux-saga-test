import {configureStore} from '@reduxjs/toolkit';
import {orderApi} from './services/orderApi';
import {productApi} from './services/productAPI';

export const store = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(orderApi.middleware)
      .concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
