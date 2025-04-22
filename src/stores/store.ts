import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
