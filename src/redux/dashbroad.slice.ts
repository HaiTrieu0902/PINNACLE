import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import {
    batchDailyExcute,
    batchDaisyList,
    batchWorkflowDashboardList,
    defectTrendWork,
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
    const url = `${API_PATHS.API}/${API_PATHS.releaseDashbroad}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get requirementWorkflowList
export const getrequirementWorkflow = createAsyncThunk('requirementWorkflow/getRequirementWorkflow', async () => {
    const url = `${API_PATHS.API}/${API_PATHS.requimentDashbroad}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get TescaseWork
export const gettestCaseWorkflow = createAsyncThunk('testCaseWorkflow/getTestCaseWorkflow', async () => {
    const url = `${API_PATHS.API}/${API_PATHS.testcasedashboard}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get batchWorkflowDashboard
export const getbatchWorkflowDashboard = createAsyncThunk(
    'batchWorkflowDashboard/getBatchWorkflowDashboard',
    async () => {
        const url = `${API_PATHS.API}/${API_PATHS.batchDashboard}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

// get defects
export const getdefectWorkflow = createAsyncThunk('defectWorkflow/getdefectWorkflow', async () => {
    const url = `${API_PATHS.API}/${API_PATHS.defectsDashboard}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get defectTrendWorkList
export const getdefectTrendWorkflow = createAsyncThunk(
    'defectTrendWorkflow/getdefectTrendWorkflow',
    async (id: string) => {
        const url = `${API_PATHS.API}/${API_PATHS.defectTrendWorkList}=${id}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

// get btachDaily
export const getBatchDailyWorkflow = createAsyncThunk(
    'BatchDailyWorkflow/getBatchDailyWorkflow',
    async ({ fromDate, toDate, Type }: batchDailyExcute) => {
        const url = `${API_PATHS.API}/Dashboard/batch-test-daily-dashboard?fromDate=${fromDate}&toDate=${toDate}&forItem=${Type}`;
        const data = await axiosData(url, 'GET');
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
