import {all} from 'redux-saga/effects';
import pokemonSaga from './pokemonSaga';

export default function* rootSaga() {
  yield all([pokemonSaga()]);
}
