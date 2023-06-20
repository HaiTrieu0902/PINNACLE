import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { releasesGridChartList } from '../types/release';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';

const params = {
    page: 0,
    pageSize: 0,
    searchString: '',
    sortName: '',
    sortType: 1,
    sortByPath: true,
    sortByPathType: 1,
};

interface Release {
    releasesGridChartList: releasesGridChartList;
}

const initialState: Release = {
    releasesGridChartList: {
        lastestReleaseId: 0,
        releasesGridChart: [
            {
                folderGrid: {
                    folderId: 0,
                    folderName: null,
                    folderNameShow: 'ds',
                    parentFolderId: null,
                },
                releaseGridDtos: [],
            },
        ],
    },
};

export const getReleaseChart = createAsyncThunk('ReleaseChart/getReleaseChart', async () => {
    const url = `${API_PATHS.API}/ReleaseRegisters/get-release-grid-chart`;
    const data = await axiosData(url, 'POST', params);
    return data;
});

const releaseSlice = createSlice({
    name: 'release',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getReleaseChart.fulfilled, (state, action) => {
            state.releasesGridChartList = action.payload;
        });
    },
});

// export const { getAccessToken, logout } = releaseSlice.actions;

export default releaseSlice.reducer;
