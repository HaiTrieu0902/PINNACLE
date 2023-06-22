import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { User } from '../types/auth';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface Auth {
    token: string | null;
    user: User;
}

const initialState: Auth = {
    token: null,
    user: {} as Required<User>,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        getUserAuth: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            Cookies.remove(ACCESS_TOKEN_KEY);
            state.token = null;
        },
    },
});

export const { getAccessToken, logout, getUserAuth } = authSlice.actions;

export default authSlice.reducer;
