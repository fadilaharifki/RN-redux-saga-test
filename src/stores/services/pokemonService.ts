import {Pokemon} from '../../interface/PokemonsInterface';
import api from './api';

export const getPokemonsAPI = async (
  offset: number,
  limit: number,
): Promise<Pokemon[]> => {
  const res = await api.get('/pokemon', {
    params: {
      offset,
      limit,
    },
  });
  return res.data.results;
};

export const getPokemonsDetailAPI = async (url: string): Promise<any> => {
  const res = await api.get(url);
  return res.data;
};
