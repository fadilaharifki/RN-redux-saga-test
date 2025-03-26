import {createApi} from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import {Product} from '../../interface/OrderInterface';

export const productApi = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['getProducts'],
  endpoints: builder => ({
    getProducts: builder.query<APIResponse<Product>, unknown>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: () => {
        return [{type: 'getProducts'}];
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
    }),
  }),
});

export const {useGetProductsQuery} = productApi;
