import {createApi} from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import {
  OrderByIdInterface,
  OrderInterface,
} from '../../interface/OrderInterface';
import Toast from 'react-native-toast-message';

interface OrderQueryParams {
  page?: number;
  limit?: number;
  customer_name?: string;
  order_date?: string;
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Orders', 'OrderById', 'DeleteOrderById'],
  endpoints: builder => ({
    getOrders: builder.query<APIResponse<OrderInterface>, OrderQueryParams>({
      query: ({page = 1, limit = 10, ...params}) => ({
        url: '/orders',
        method: 'GET',
        params: {page, limit, ...params},
      }),
      providesTags: (result, error, {page}) => {
        return [{type: 'Orders', id: page}];
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      merge: (currentCache, newItems) => {
        if (!newItems?.list.length) return currentCache;

        return {
          ...newItems,
          list:
            currentCache?.list && newItems.page > 1
              ? [...currentCache.list, ...newItems.list]
              : newItems.list,
        };
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getOrderById: builder.query<OrderByIdInterface, {id: string | number}>({
      query: ({id}) => ({
        url: `/order/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, {id}) => {
        return [{type: 'OrderById', id: id}];
      },
    }),
    deleteOrderById: builder.mutation<void, {id: string | number}>({
      query: ({id}) => ({
        url: `/order/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({id}, {dispatch, queryFulfilled}) => {
        try {
          await queryFulfilled;
          Toast.show({
            type: 'success',
            text1: 'Data Deleted',
            text2: 'The data has been successfully deleted! 👋',
          });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to delete the order!',
          });
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: 'DeleteOrderById', id}],
    }),
    createOrder: builder.mutation<OrderInterface, Partial<OrderInterface>>({
      query: newOrder => ({
        url: '/orders',
        method: 'POST',
        data: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderByIdMutation,
  useCreateOrderMutation,
} = orderApi;
