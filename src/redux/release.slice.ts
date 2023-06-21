/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import { releasesGridChartList } from '../types/release';

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
    conditionSorter: {
        order: string | undefined;
        field: string | undefined;
    };

    keySearch: string | null;
    originalReleasesGridChartList: releasesGridChartList;
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

    conditionSorter: {
        order: undefined,
        field: undefined,
    },
    keySearch: null,

    originalReleasesGridChartList: {
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
            state.conditionSorter = action.payload;
        },
        changeValueKeySearch: (state, action: PayloadAction<string>) => {
            state.keySearch = action.payload;
            const searchValue = action.payload.toLowerCase();

            if (searchValue.trim() === '') {
                state.releasesGridChartList = state.originalReleasesGridChartList;
            } else {
                state.releasesGridChartList.releasesGridChart = state.releasesGridChartList.releasesGridChart.map(
                    (folder) => {
                        const filteredReleaseGridDtos = folder.releaseGridDtos.filter((release) => {
                            const folderNameMatch = folder.folderGrid.folderNameShow
                                ?.toLowerCase()
                                .includes(searchValue);
                            const titleMatch = release.title.toLowerCase().includes(searchValue);
                            const idMatch = release.id.toString().toLowerCase().includes(searchValue);
                            const ownerMatch = release.owner.toLowerCase().includes(searchValue);
                            const typeMatch = release.type.toLowerCase().includes(searchValue);
                            const bussinessMatch = release.businessImportance.toLowerCase().includes(searchValue);
                            return (
                                folderNameMatch || titleMatch || idMatch || ownerMatch || typeMatch || bussinessMatch
                            );
                        });

                        return {
                            folderGrid: folder.folderGrid,
                            releaseGridDtos: filteredReleaseGridDtos,
                        };
                    },
                );
                state.releasesGridChartList.releasesGridChart = state.releasesGridChartList.releasesGridChart.filter(
                    (folder) => folder.releaseGridDtos.length > 0,
                );
            }
        },
        arrangeReleasesGridCharTable: (state, action: PayloadAction<boolean>) => {
            console.log('dap da cuoi thu', action.payload);
            // xuwr ly ham loc o day
        },
    },
    extraReducers(builder) {
        builder.addCase(getReleaseChart.fulfilled, (state, action) => {
            state.releasesGridChartList = action.payload;
            state.originalReleasesGridChartList = action.payload;
        });
    },
});

export const { filterReleasesGridCharTable, changeValueKeySearch, arrangeReleasesGridCharTable } = releaseSlice.actions;

export default releaseSlice.reducer;
