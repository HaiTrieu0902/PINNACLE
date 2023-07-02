import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import {
    ActivityHistoryList,
    AttachmentDetail,
    AttachmentsList,
    ReleaseDefectCoverageList,
    ReleaseDefectCoverageListAdd,
    ReleaseScopeListAdd,
    releaseScopeList,
} from '../types/activity';

interface Activity {
    activityHistoryList: ActivityHistoryList;
    releaseScopeList: releaseScopeList;
    releaseScopeListAdd: ReleaseScopeListAdd;
    releaseDefectCoverageList: ReleaseDefectCoverageList;
    releaseDefectCoverageListAdd: ReleaseDefectCoverageListAdd;
    releaseAttachmentsList: AttachmentsList;
    attachmentDetail: AttachmentDetail;
}

const initialState: Activity = {
    activityHistoryList: {} as ActivityHistoryList,
    releaseScopeList: {} as releaseScopeList,
    releaseScopeListAdd: {} as ReleaseScopeListAdd,
    releaseDefectCoverageList: {} as ReleaseDefectCoverageList,
    releaseDefectCoverageListAdd: {} as ReleaseDefectCoverageListAdd,
    releaseAttachmentsList: {} as AttachmentsList,
    attachmentDetail: {} as AttachmentDetail,
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

//get-release-defect
export const getRelaseDefects = createAsyncThunk(
    'RelaseDefects/getRelaseDefects',
    async ({ id, type, valueSearch }: { id: number; type: number; valueSearch: string }) => {
        const url = `${API_PATHS.API}/ReleaseDefectCoverage/get-release-defect?releaseId=${id}&selectionType=${type}&searchString=${valueSearch}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

//get-release-attachment
export const getRelaseAttachments = createAsyncThunk(
    'RelaseAttachments/getRelaseAttachments',
    async ({ entityId, entityTypes }: { entityId: number; entityTypes: number }) => {
        const url = `${API_PATHS.API}/Attachment/get-release-attachment?entityId=${entityId}&entityTypes=${entityTypes}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

//get-attachment-detail
export const getAttachmentDetail = createAsyncThunk(
    'AttachmentDetail/getRelaseAttachments',
    async ({ attachmentId }: { attachmentId: number }) => {
        const url = `${API_PATHS.API}/Attachment/get-attachment-detail?attachmentId=${attachmentId}`;
        const data = await axiosData(url, 'GET');
        return data;
    },
);

// End Activity Release =================================================================

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        resetValueAttachmentDetail: (state) => {
            state.attachmentDetail = initialState.attachmentDetail;
        },
    },
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
            })
            .addCase(getRelaseDefects.fulfilled, (state, action) => {
                const { type } = action.meta.arg;
                if (type === 2) {
                    state.releaseDefectCoverageList = action.payload;
                }
                if (type === 3) {
                    state.releaseDefectCoverageListAdd = action.payload;
                }
            })
            .addCase(getRelaseAttachments.fulfilled, (state, action) => {
                const { entityTypes } = action.meta.arg;
                if (entityTypes === 2) {
                    state.releaseAttachmentsList = action.payload;
                }
            })
            .addCase(getAttachmentDetail.fulfilled, (state, action) => {
                state.attachmentDetail = action.payload;
            });
    },
});

export const { resetValueAttachmentDetail } = activitySlice.actions;

export default activitySlice.reducer;
