import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {FETCH_POKEMONS, FETCH_POKEMONS_SUCCESS} from '../types/pokemonTypes';

interface Pokemon {
  id: number;
  name: string;
}

interface PokemonState {
  data: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: [],
  isLoading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    [FETCH_POKEMONS]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [FETCH_POKEMONS_SUCCESS]: (state, action: PayloadAction<Pokemon[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export default pokemonSlice.reducer;
