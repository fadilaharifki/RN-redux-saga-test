import {call, put, takeLatest, all} from 'redux-saga/effects';
import {getPokemonsAPI, getPokemonsDetailAPI} from '../services/pokemonService';
import {
  fetchPokemonsFailure,
  fetchPokemonsSuccess,
} from '../slices/pokemonSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {fetchPokemon} from '../slices/pokemonSlice';
import {Pokemon} from '../../interface/PokemonsInterface';

function* handleFetchPokemons(
  action: PayloadAction<{offset: number; limit: number}>,
): Generator<any, void, Pokemon[]> {
  try {
    const {offset, limit} = action.payload;
    const data = yield call(getPokemonsAPI, offset, limit);

    const newData = yield all(
      data.map(pokemon => call(fetchPokemonDetail, pokemon.url)),
    );

    const detailedData = data.map((pokemon, index) => ({
      ...pokemon,
      detail: newData[index],
    }));

    yield put(fetchPokemonsSuccess(detailedData));
  } catch (error: any) {
    yield put(fetchPokemonsFailure(error.message));
  }
}

function* fetchPokemonDetail(url: string): Generator<any, any, any> {
  try {
    const detail: any = yield call(getPokemonsDetailAPI, url);
    return {
      ability: detail?.abilities ?? [],
      base_experience: detail?.base_experience ?? 0,
      height: detail?.height ?? 0,
      weight: detail?.weight ?? 0,
      type: detail?.types ?? [],
      image: detail?.sprites?.other?.['official-artwork']?.front_shiny ?? '',
    };
  } catch (error: any) {
    throw new Error('Error fetching Pokémon detail');
  }
}

export default function* pokemonSaga() {
  yield takeLatest(fetchPokemon.type, handleFetchPokemons);
}
