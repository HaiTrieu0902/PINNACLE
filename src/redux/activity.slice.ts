import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import { ActivityHistoryList, ReleaseScopeListAdd, releaseScopeList } from '../types/activity';

interface Activity {
    activityHistoryList: ActivityHistoryList;
    releaseScopeList: releaseScopeList;
    releaseScopeListAdd: ReleaseScopeListAdd;
}

const initialState: Activity = {
    activityHistoryList: {} as ActivityHistoryList,
    releaseScopeList: {} as releaseScopeList,
    releaseScopeListAdd: {} as ReleaseScopeListAdd,
};

// Start Activity Release ==============================================================
// get-release-history
export const getRelaseHistory = createAsyncThunk('RelaseHistory/getRelaseHistory', async (id: number) => {
    const url = `${API_PATHS.API}/Releases/get-release-history?releaseId=${id}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get-release-scope
export const getRelaseScope = createAsyncThunk(
    'RelaseScope/getRelaseScope',
    async ({ id, type, valueSearch }: { id: number; type: number; valueSearch: string }) => {
        const url = `${API_PATHS.API}/ReleaseRequiredmentScope/get-release-scope?releaseId=${id}&selectionType=${type}&searchString=${valueSearch}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

// End Activity Release =================================================================

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getRelaseHistory.fulfilled, (state, action) => {
                state.activityHistoryList = action.payload;
            })
            .addCase(getRelaseScope.fulfilled, (state, action) => {
                const { type } = action.meta.arg;
                if (type === 2) {
                    state.releaseScopeList = action.payload;
                }
                if (type === 3) {
                    state.releaseScopeListAdd = action.payload;
                }
            });
    },
});

// export const {} = activitySlice.actions;

export default activitySlice.reducer;
