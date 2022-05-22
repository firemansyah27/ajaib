import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const apiUsersSlice = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      getUsersData: builder.mutation({
        query: (params) => ({
            url: params? '?' + params : '',
            method: 'GET',
          })
      }),
    }
  },
})

export const { useGetUsersDataMutation } = apiUsersSlice
