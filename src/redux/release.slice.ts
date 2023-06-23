/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import {
    releaseDetail,
    releaseDetailList,
    releaseTypeList,
    releasesGanttChartList,
    releasesGridChartList,
} from '../types/release';

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
    releaseDetailList: releaseDetailList;
    releaseTypeList: releaseTypeList;
    releasesGanttChartList: releasesGanttChartList;
    releaseId: number | null;
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

    releaseDetailList: {
        releaseDetail: {} as Required<releaseDetail>,
    },
    releaseId: null,
    releaseTypeList: { releaseType: [] },
    releasesGanttChartList: { releasesGanttChart: [] },
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

// get ReleaseChart
export const getReleaseChart = createAsyncThunk('ReleaseChart/getReleaseChart', async () => {
    const url = `${API_PATHS.API}/ReleaseRegisters/get-release-grid-chart`;
    const data = await axiosData(url, 'POST', params);
    return data;
});

// get releaseDetail
export const getReleaseDetail = createAsyncThunk('ReleaseDetail/getReleaseDetail', async (id: number) => {
    const url = `${API_PATHS.API}/Releases/get-release-detail?id=${id}`;
    const data = await axiosData(url, 'GET');
    return data;
});

// get release Type
export const getReleaseType = createAsyncThunk('ReleaseType/getReleaseType', async () => {
    const url = `${API_PATHS.API}/Releases/get-release-type`;
    const data = await axiosData(url, 'GET');
    return data;
});

//get businessImportant
export const getBusinessImportance = createAsyncThunk('BusinessImportance/getBusinessImportance', async () => {
    const url = `${API_PATHS.API}/BusinessImportance`;
    const data = await axiosData(url, 'GET');
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
            const sortOrder = action.payload;
            // Hàm sắp xếp theo trường folderNameShow
            const sortByFolderNameShow = (a: any, b: any) => {
                const folderNameA = a.folderGrid.folderNameShow.toLowerCase();
                const folderNameB = b.folderGrid.folderNameShow.toLowerCase();
                if (sortOrder) {
                    if (folderNameA < folderNameB) return -1;
                    if (folderNameA > folderNameB) return 1;
                } else if (!sortOrder) {
                    if (folderNameA > folderNameB) return -1;
                    if (folderNameA < folderNameB) return 1;
                }
                return 0;
            };
            state.releasesGridChartList.releasesGridChart.sort(sortByFolderNameShow);
        },
        getreleaseId: (state, action: PayloadAction<number | null>) => {
            state.releaseId = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getReleaseChart.fulfilled, (state, action) => {
                state.releasesGridChartList = action.payload;
                state.originalReleasesGridChartList = action.payload;
            })
            .addCase(getReleaseDetail.fulfilled, (state, action) => {
                state.releaseDetailList = action.payload;
            })
            .addCase(getReleaseType.fulfilled, (state, action) => {
                state.releaseTypeList = action.payload;
            })
            .addCase(getBusinessImportance.fulfilled, (state, action) => {
                state.releasesGanttChartList = action.payload;
            });
    },
});

export const { filterReleasesGridCharTable, changeValueKeySearch, arrangeReleasesGridCharTable, getreleaseId } =
    releaseSlice.actions;

export default releaseSlice.reducer;
