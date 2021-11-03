import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvailableToastVariant } from '../../types/global'

export type errorContent = {
    isError: boolean,
    message: string,
    type: AvailableToastVariant
}

export interface ErrorState {
    error: errorContent;
}

const initialState: ErrorState = {
    error: {
        isError: false,
        message: "",
        type: AvailableToastVariant.error
    }
}

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<errorContent>) {
            state.error = action.payload
        }
    }
})

export const { setError } = errorsSlice.actions;
export default errorsSlice.reducer;