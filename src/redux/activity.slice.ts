import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import { ActivityHistoryList } from '../types/activity';

interface Activity {
    activityHistoryList: ActivityHistoryList;
}

const initialState: Activity = {
    activityHistoryList: {} as ActivityHistoryList,
};

// Start Activity Release ==============================================================
// get-release-history
export const getRelaseHistory = createAsyncThunk('RelaseHistory/getRelaseHistory', async (id: number) => {
    const url = `${API_PATHS.API}/Releases/get-release-history?releaseId=${id}`;
    const data = await axiosData(url, 'GET');
    return data;
});
// End Activity Release =================================================================

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRelaseHistory.fulfilled, (state, action) => {
            state.activityHistoryList = action.payload;
        });
    },
});

// export const {} = activitySlice.actions;

export default activitySlice.reducer;
