import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Launch } from '../../types/global';

export const launchesApiSlice = createApi({
    reducerPath: 'launchesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spacex.land/rest',
    }),
    endpoints(builder) {
        return {
            fetchLaunchesPerPage: builder.query<Launch[], number>({
                query(limit) {
                    return `/launches?limit=6&offset=${limit * 2}`;
                },
            }),
        }
    }
})

export const { useFetchLaunchesPerPageQuery } = launchesApiSlice;