import {
    LOAD_LAUNCHES,
    ADD_LAUNCH,
    SET_SELECTED_LAUNCH,
    RESET_LAUNCHES,
    LoadLaunchesAction,
    AddLaunchAction,
    SetSelectedLaunchAction,
    ResetLaunchesAction
} from '../actions/launchesActions';
import { Launch } from '../../globalTypes';

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

const launchesReducer = (
    state: LaunchState = initialState,
    action: LoadLaunchesAction | AddLaunchAction | SetSelectedLaunchAction | ResetLaunchesAction
) => {
    switch (action.type) {
        case LOAD_LAUNCHES:
            return { ...state, favoriteLaunches: action.payload }
        case ADD_LAUNCH:
            return { ...state, launches: [...state.launches, action.payload] }
        case SET_SELECTED_LAUNCH:
            return { ...state, selectedLaunch: action.payload }
        case RESET_LAUNCHES:
            return { ...state, launches: action.payload }
        default:
            return { ...state }
    }
}

export default launchesReducer;