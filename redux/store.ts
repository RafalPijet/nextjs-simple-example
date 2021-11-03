import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from './launches/launches-slice';
import errorsSlice from './errors/errors-slice';
import { launchesApiSlice } from './launches/launches-api-slice';

export const store = configureStore({
    reducer: {
        errors: errorsSlice,
        launches: launchesReducer,
        [launchesApiSlice.reducerPath]: launchesApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(launchesApiSlice.middleware)
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>