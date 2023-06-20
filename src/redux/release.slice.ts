/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import { releasesGridChartList } from '../types/release';
import { RootState } from '../store';

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
                    folderNameShow: '',
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
    reducers: {
        filterReleasesGridCharTable: (state, action: PayloadAction<any>) => {
            const searchTerm = action.payload;
            console.log(JSON.parse(JSON.stringify(state.releasesGridChartList.releasesGridChart)));

            console.log(
                'hihihh',
                JSON.parse(
                    JSON.stringify(
                        state.releasesGridChartList.releasesGridChart.forEach((item) => {
                            return item.releaseGridDtos.slice().sort((a, b) => b.id - a.id);
                        }),
                    ),
                ),
            );
        },
    },
    extraReducers(builder) {
        builder.addCase(getReleaseChart.fulfilled, (state, action) => {
            console.log(action.payload);
            state.releasesGridChartList = action.payload;
        });
    },
});

export const { filterReleasesGridCharTable } = releaseSlice.actions;

export default releaseSlice.reducer;
