import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { API_PATHS } from '../configs/api';
import axios from 'axios';
import {
    batchDailyExcute,
    batchDaisyList,
    batchWorkflowDashboardList,
    defectTrendWork,
    defectTrendWorkList,
    defectWorkflowList,
    releaseWorkflowList,
    requirementWorkflowList,
    testCaseWorkflowList,
} from '../types/dashbroad';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface Dashbroad {
    releaseWorkflow: releaseWorkflowList;
    requirementWorkflowList: requirementWorkflowList;
    testCaseWorkflowList: testCaseWorkflowList;
    batchWorkflowDashboardList: batchWorkflowDashboardList;
    defectWorkflowList: defectWorkflowList;
    defectTrendWorkList: defectTrendWork[];
    batchDaisyList: batchDaisyList[];

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
        requirementCustom: [],
        requirementWorkflow: {
            workflowItems: [],
            total: '',
        },
        requirementRisk: [],
    },

    testCaseWorkflowList: {
        testCaseCustom: [],
        testCaseWorkflow: {
            workflowItem: [],
            total: '',
        },
        testCaseException: [],
    },

    batchWorkflowDashboardList: {
        batchExceptionDashboard: [],
        batchWorkflowDashboard: {
            workflowItem: [],
            total: '',
        },
    },

    defectWorkflowList: {
        defectWorkflow: {
            workflowItems: [],
            total: '',
        },
        defectExceptions: [],
        defectRisk: [],
    },

    defectTrendWorkList: [],
    batchDaisyList: [],
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

// get TescaseWork
export const gettestCaseWorkflow = createAsyncThunk('testCaseWorkflow/getTestCaseWorkflow', async () => {
    const response = await axios.get(`${API_PATHS.API}/${API_PATHS.testcasedashboard}`, {
        headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data;
    return data;
});

// get batchWorkflowDashboard
export const getbatchWorkflowDashboard = createAsyncThunk(
    'batchWorkflowDashboard/getBatchWorkflowDashboard',
    async () => {
        const response = await axios.get(`${API_PATHS.API}/${API_PATHS.batchDashboard}`, {
            headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data;
        return data;
    },
);

// get defects
export const getdefectWorkflow = createAsyncThunk('defectWorkflow/getdefectWorkflow', async () => {
    const response = await axios.get(`${API_PATHS.API}/${API_PATHS.defectsDashboard}`, {
        headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data;
    return data;
});

// get defectTrendWorkList
export const getdefectTrendWorkflow = createAsyncThunk(
    'defectTrendWorkflow/getdefectTrendWorkflow',
    async (id: string) => {
        const response = await axios.get(`${API_PATHS.API}/${API_PATHS.defectTrendWorkList}=${id}`, {
            headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data;
        return data;
    },
);
///Dashboard/batch-test-daily-dashboard?fromDate=2022-05-04T10:45:13&toDate=2023-06-13T10:45:07&forItem=Test Cases
// get btachDaily
export const getBatchDailyWorkflow = createAsyncThunk(
    'BatchDailyWorkflow/getBatchDailyWorkflow',
    async ({ fromDate, toDate, Type }: batchDailyExcute) => {
        const response = await axios.get(
            `${API_PATHS.API}/Dashboard/batch-test-daily-dashboard?fromDate=${fromDate}&toDate=${toDate}&forItem=${Type}`,
            {
                headers: { Auth: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
            },
        );
        const data = response.data;
        return data;
    },
);

const dashbroadSlice = createSlice({
    name: 'dashbroad',
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
            .addCase(gettestCaseWorkflow.fulfilled, (state, action) => {
                state.testCaseWorkflowList = action.payload;
            })
            .addCase(getbatchWorkflowDashboard.fulfilled, (state, action) => {
                state.batchWorkflowDashboardList = action.payload;
            })
            .addCase(getdefectWorkflow.fulfilled, (state, action) => {
                state.defectWorkflowList = action.payload;
            })
            .addCase(getdefectTrendWorkflow.fulfilled, (state, action) => {
                state.defectTrendWorkList = action.payload;
            })
            .addCase(getBatchDailyWorkflow.fulfilled, (state, action) => {
                state.batchDaisyList = action.payload;
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
