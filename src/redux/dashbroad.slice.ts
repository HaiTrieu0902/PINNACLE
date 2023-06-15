import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { API_PATHS } from '../configs/api';
import axios from 'axios';
import { releaseWorkflowList, requirementWorkflowList } from '../types/dashbroad';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface Dashbroad {
    releaseWorkflow: releaseWorkflowList;
    requirementWorkflowList: requirementWorkflowList;
    loading: boolean;
}

const initialState: Dashbroad = {
    releaseWorkflow: {
        releaseCustom: [],
        releaseWorkflow: {
            workflowItems: [],
            total: '',
        },
    },
    requirementWorkflowList: {
        requirementWorkflow: {
            workflowItems: [],
            total: '',
        },
        requirementCustom: [],
        requirementRisk: [],
    },

    loading: false,
};

// get releaseWorkflow
export const getreleaseWorkflow = createAsyncThunk('releaseWorkflow/getEeleaseWorkflow', async () => {
    const response = await axios.get(`${API_PATHS.API}/${API_PATHS.releaseDashbroad}`, {
        headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data;
    return data;
});

// get requirementWorkflowList
export const getrequirementWorkflow = createAsyncThunk('requirementWorkflow/getRequirementWorkflow', async () => {
    const response = await axios.get(`${API_PATHS.API}/${API_PATHS.requimentDashbroad}`, {
        headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data;
    return data;
});

const dashbroadSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getreleaseWorkflow.fulfilled, (state, action) => {
                state.releaseWorkflow = action.payload;
            })
            .addCase(getrequirementWorkflow.fulfilled, (state, action) => {
                state.requirementWorkflowList = action.payload;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loading = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                },
            );
    },
});

// export const {} = dashbroadSlice.actions;

export default dashbroadSlice.reducer;
