import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from './store';
import { loadLaunches, setSelectedLaunch } from './launches/launches-slice';
import { setError } from './errors/errors-slice';
import { Launch, AvailableToastVariant } from '../types/global';

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const addLaunchToFavorites = (): AppThunk => async (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        if (favorites.length < 5) {
            const currentLaunch = getState().launches.selectedLaunch;
            if (currentLaunch !== null) {
                const result = favorites.find((item: Launch) => item.id === currentLaunch.id);
                if (result === undefined) {
                    favorites = [
                        ...favorites,
                        currentLaunch,
                    ];
                    localStorage.setItem('launchesStorage', JSON.stringify(favorites));
                    dispatch(getFavoritesLaunchesFromLocalStorage());
                    if (favorites.length === 5) {
                        dispatch(setError({
                            isError: true,
                            message: 'You have reached the maximum number of 5 items in the FAVORITES folder',
                            type: AvailableToastVariant.info
                        }))
                    }
                }
            }

        }
    } else {
        const preparedData = [getState().launches.selectedLaunch];
        localStorage.setItem('launchesStorage', JSON.stringify(preparedData));
        dispatch(getFavoritesLaunchesFromLocalStorage());
    }
}

export const removeLaunchFromFavorites = (id: string): AppThunk => (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        favorites = favorites.filter((item: Launch) => item.id !== id);
        localStorage.setItem('launchesStorage', JSON.stringify(favorites));
        const selectedLaunch = getState().launches.selectedLaunch
        if (selectedLaunch !== null) {
            if (selectedLaunch.id === id) {
                dispatch(setSelectedLaunch(null));
            }
        }
        dispatch(getFavoritesLaunchesFromLocalStorage());
    } else {
        dispatch(setError({
            isError: true,
            message: "Current Favorites item not exist in storage",
            type: AvailableToastVariant.error
        }))
    }
}

export const getFavoritesLaunchesFromLocalStorage = (): AppThunk => (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        dispatch(loadLaunches(favorites))
    }
}