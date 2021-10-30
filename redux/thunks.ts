import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';
import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    startRequest,
    stopRequest,
    errorRequest,
} from './actions/requestActions';
import {
    LoadLaunchesAction,
    AddLaunchAction,
    SetSelectedLaunchAction,
    ResetLaunchesAction,
    loadLaunches,
    addLaunch,
    setLaunch,
    resetLaunches
} from './actions/launchesActions';
import { Launch } from '../types/global';;

export const getLaunchesRequest = (page: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction |
    AddLaunchAction | ResetLaunchesAction
> => async (dispatch, getState) => {
    dispatch(startRequest());
    dispatch(resetLaunches([]));

    try {
        const res: AxiosResponse = await axios.get(
            `https://api.spacex.land/rest/launches?limit=6&offset=${page * 2}`
        );
        let fetchedData: any[] = res.data;
        if (fetchedData) {
            const result: Launch[] = fetchedData.map((item: any) => {
                return {
                    id: item.id,
                    name: item.mission_name,
                    description: item.details,
                    date: item.launch_date_local,
                    images: item.ships,
                };
            });
            result.forEach(async (item: Launch) => {
                if (item.images.length) {
                    try {
                        const response: AxiosResponse = await axios.get(
                            `https://api.spacex.land/rest/ship/${item.images[0].id}`
                        );
                        let fechedShip: any = response.data;
                        if (fechedShip) {
                            let image = {
                                id: item.id,
                                name: fechedShip.name,
                                image: fechedShip.image,
                            }
                            item.images = [image];
                            dispatch(addLaunch(item))
                        }
                    } catch (err: any) {
                        if (err.response !== undefined) {
                            err.response.data.message ?
                                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
                        } else {
                            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
                        }
                        dispatch(stopRequest());
                    }
                } else {
                    dispatch(addLaunch(item))
                }
            })
        }
        dispatch(stopRequest());
    } catch (err: any) {
        console.log(err.response.data.message)
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const addLaunchToFavorites = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    ErrorRequestAction
> => async (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        if (favorites.length < 5) {
            const currentLaunch = getState().launches.selectedLaunch
            const result = favorites.find((item: Launch) => item.id === currentLaunch.id);
            if (result === undefined) {
                favorites = [
                    ...favorites,
                    currentLaunch,
                ];
                localStorage.setItem('launchesStorage', JSON.stringify(favorites));
                dispatch(getFavoritesLaunchesFromLocalStorage());
                if (favorites.length === 5) {
                    dispatch(errorRequest({ isError: true, message: 'You have reached the maximum number of 5 items in the FAVORITES folder' }));
                }
            }
        }
    } else {
        const preparedData = [getState().launches.selectedLaunch];
        localStorage.setItem('launchesStorage', JSON.stringify(preparedData));
        dispatch(getFavoritesLaunchesFromLocalStorage());
    }
}

export const removeLaunchFromFavorites = (id: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    ErrorRequestAction | SetSelectedLaunchAction
> => async (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        favorites = favorites.filter((item: Launch) => item.id !== id);
        localStorage.setItem('launchesStorage', JSON.stringify(favorites));
        if (getState().launches.selectedLaunch !== null) {
            if (getState().launches.selectedLaunch.id === id) {
                dispatch(setLaunch(null));
            }
        }
        dispatch(getFavoritesLaunchesFromLocalStorage());
    } else {
        dispatch(errorRequest({ isError: true, message: "Current Favorites item not exist in storage" }));
    }
}

export const getFavoritesLaunchesFromLocalStorage = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    LoadLaunchesAction
> => async (dispatch, getState) => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        dispatch(loadLaunches(favorites))
    }
}