import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pokemon} from '../../interface/PokemonsInterface';

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
    fetchPokemon(
      state,
      _action: PayloadAction<{offset: number; limit: number}>,
    ) {
      state.isLoading = true;
    },
    fetchPokemonsSuccess(state, action: PayloadAction<Pokemon[]>) {
      state.isLoading = false;
      if (state.data.length > 0) {
        state.data = [...state.data, ...action.payload];
      } else {
        state.data = action.payload;
      }
    },
    fetchPokemonsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPokemon(state) {
      state.data = [];
      state.error = null;
    },
  },
});

export const {
  fetchPokemon,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  resetPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
