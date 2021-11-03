import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Launch } from '../../types/global';

export interface LaunchState {
    launches: Launch[];
    favoriteLaunches: Launch[];
    selectedLaunch: Launch | null;
}

const initialState: LaunchState = {
    launches: [],
    favoriteLaunches: [],
    selectedLaunch: null
}

const launchesSlice = createSlice({
    name: 'launches',
    initialState,
    reducers: {
        loadLaunches(state, action: PayloadAction<Launch[]>) {
            state.favoriteLaunches = action.payload
        },
        addLaunch(state, action: PayloadAction<Launch>) {
            state.launches = [...state.launches, action.payload]
        },
        setSelectedLaunch(state, action: PayloadAction<Launch | null>) {
            state.selectedLaunch = action.payload
        },
        resetLaunch(state, action: PayloadAction<Launch[]>) {
            state.launches = action.payload
        }
    }
});

export const { loadLaunches, addLaunch, setSelectedLaunch, resetLaunch } = launchesSlice.actions;
export default launchesSlice.reducer;