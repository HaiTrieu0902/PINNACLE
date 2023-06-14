import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface Auth {
    token: string | null;
}

const initialState: Auth = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            Cookies.remove(ACCESS_TOKEN_KEY);
            state.token = null;
        },
    },
});

export const { getAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
