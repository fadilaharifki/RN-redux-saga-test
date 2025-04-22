import {combineReducers} from 'redux';
import orderReducer from './pokemonReducer';

export default combineReducers({
  order: orderReducer,
});
