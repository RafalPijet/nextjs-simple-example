import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from '../store';
import { setError } from '../errors/errors-slice';
import { Launch, Ship, AvailableToastVariant } from '../../types/global';

const errorsHandling = (err: any) => {
    if (err.response.data.message) {
        store.dispatch(
            setError({
                isError: true,
                message: `Error!!! ${err.response.data.message}`,
                type: AvailableToastVariant.error,
            })
        );
    } else {
        store.dispatch(
            setError({
                isError: true,
                message: 'Something went wrong!',
                type: AvailableToastVariant.error,
            })
        );
    }
}


export const getLaunches = createAsyncThunk('fetch/launches', async (limit: number) => {
    try {

        const response = await axios.get(`https://api.spacex.land/rest/launches?limit=6&offset=${limit * 2}`);
        if (response.data) {
            let result: Launch[] = response.data.map((item: any) => {
                return {
                    id: item.id,
                    name: item.mission_name,
                    description: item.details,
                    date: item.launch_date_local,
                    images: item.ships,
                };
            });
            const launches = result.map(async (item: Launch) => {
                if (item.images.length) {
                    try {
                        const res = await axios.get(`https://api.spacex.land/rest/ship/${item.images[0].id}`);
                        const fechedShip: any = res.data;
                        if (fechedShip) {
                            let image: Ship = {
                                id: item.id,
                                name: fechedShip.name,
                                image: fechedShip.image,
                            };
                            item.images = [image];
                        }
                    } catch (err: any) {
                        errorsHandling(err);
                    }
                }
                return item
            })
            return Promise.all(launches);
        }
    } catch (err: any) {
        errorsHandling(err)
    }
});

export type LaunchesState = {
    data: Launch[];
    isPending: boolean;
};

const initialState: LaunchesState = {
    data: [],
    isPending: false,
};

export const launchesApiReducer = createReducer(initialState, builder => {
    builder
        .addCase(getLaunches.pending, state => {
            state.isPending = true;
        })
        .addCase(getLaunches.fulfilled, (state, { payload }) => {
            state.isPending = false;
            state.data = payload !== undefined ? payload : [];

        })
        .addCase(getLaunches.rejected, state => {
            state.isPending = false;
        });
});

export const selectLaunchesApi = (state: RootState) => state.launchesApi;
export const launchesSelector = createSelector(selectLaunchesApi, state => state);

export default launchesApiReducer;
