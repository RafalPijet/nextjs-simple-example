import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Launch } from '../../types/global';

export interface LaunchState {
    favoriteLaunches: Launch[];
    selectedLaunch: Launch | null;
}

const initialState: LaunchState = {
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
        setSelectedLaunch(state, action: PayloadAction<Launch | null>) {
            state.selectedLaunch = action.payload
        },
    }
});

export const { loadLaunches, setSelectedLaunch } = launchesSlice.actions;
export default launchesSlice.reducer;