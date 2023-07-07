import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import { User, UserSelectList } from '../types/auth';
import { ACCESS_TOKEN_KEY } from '../utils/constant';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface Auth {
    token: string | null;
    user: User;
    userSelectList: UserSelectList;
}

const initialState: Auth = {
    token: null,
    user: {} as Required<User>,
    userSelectList: {} as Required<UserSelectList>,
};

// get User Select
export const getUserSelects = createAsyncThunk('UserSelects/getUserSelects', async () => {
    const url = `${API_PATHS.API}/Users/get-user-select`;
    const data = await axiosData(url, 'GET');
    return data;
});

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
            localStorage.setItem('accessToken', '');
            Cookies.remove(ACCESS_TOKEN_KEY);
            state.token = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(getUserSelects.fulfilled, (state, action) => {
            state.userSelectList = action.payload;
        });
    },
});

export const { getAccessToken, logout, getUserAuth } = authSlice.actions;

export default authSlice.reducer;
