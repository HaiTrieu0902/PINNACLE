/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_PATHS } from '../configs/api';
import { axiosData } from '../configs/axiosApiCusomer';
import {
    MiniDashboardItemList,
    releaseDetail,
    releaseDetailList,
    releaseExcutionStatus,
    releaseIssueStatusList,
    releaseTypeList,
    releasesFolderChartList,
    releasesGanttChartList,
    releasesGridChartList,
    workflowAction,
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
    releasesFolderChartList: releasesFolderChartList;
    workflowActionList: workflowAction[];
    miniDashboardItemList: MiniDashboardItemList[];
    releaseExcutionStatus: releaseExcutionStatus;
    releaseIssueStatusList: releaseIssueStatusList;
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
    workflowActionList: [],
    miniDashboardItemList: [],
    releasesFolderChartList: {} as Required<releasesFolderChartList>,
    releaseExcutionStatus: {} as Required<releaseExcutionStatus>,
    releaseIssueStatusList: {} as Required<releaseIssueStatusList>,
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

//  get-release-folder-chart
export const getReleaseFolderChart = createAsyncThunk(
    'ReleaseFolderChart/getReleaseFolderChart',
    async (searchString: string) => {
        const url = `${API_PATHS.API}/ReleaseRegisters/get-release-folder-chart?searchString=${searchString}`;
        const data = await axiosData(url, 'POST', searchString);
        return data;
    },
);

// get-release-workflow
export const getRelaseWorkFlow = createAsyncThunk('RelaseWorkFlow/getRelaseWorkFlow', async () => {
    const url = `${API_PATHS.API}/Releases/get-release-workflow`;
    const data = await axiosData(url, 'GET');
    return data?.workflowAction || data;
});

// get-release-mini-dashboard
export const getRelaseMiniDashbroad = createAsyncThunk(
    'RelaseMiniDashbroad/getRelaseMiniDashbroad',
    async (id: number) => {
        const url = `${API_PATHS.API}/Releases/get-release-mini-dashboard?id=${id}`;
        const data = await axiosData(url, 'GET');
        return data?.result || data;
    },
);

// get-release-excution-status-v2
export const getRelaseExcution = createAsyncThunk('RelaseExcution/getRelaseExcution', async (id: number) => {
    const url = `${API_PATHS.API}/Releases/get-release-excution-status-v2?id=${id}`;
    const data = await axiosData(url, 'GET');
    return data?.releaseExcutionStatus || data;
});

// get-release-issue-status
export const getRelaseIssueStatus = createAsyncThunk('RelaseIssueStatus/getRelaseIssueStatus', async (id: number) => {
    const url = `${API_PATHS.API}/Releases/get-release-issue-status?id=${id}`;
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
        resetValueMiniDashbroad: (state) => {
            state.miniDashboardItemList = initialState.miniDashboardItemList;
        },
        resetValueMiniExcute: (state) => {
            state.releaseExcutionStatus = initialState.releaseExcutionStatus;
        },
        resetValueMiniIssueStatus: (state) => {
            state.releaseIssueStatusList = initialState.releaseIssueStatusList;
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
            })
            .addCase(getReleaseFolderChart.fulfilled, (state, action) => {
                state.releasesFolderChartList = action.payload;
            })
            .addCase(getRelaseWorkFlow.fulfilled, (state, action) => {
                state.workflowActionList = action.payload;
            })
            .addCase(getRelaseMiniDashbroad.fulfilled, (state, action) => {
                state.miniDashboardItemList = action.payload;
            })
            .addCase(getRelaseExcution.fulfilled, (state, action) => {
                state.releaseExcutionStatus = action.payload;
            })
            .addCase(getRelaseIssueStatus.fulfilled, (state, action) => {
                state.releaseIssueStatusList = action.payload;
            });
    },
});

export const {
    filterReleasesGridCharTable,
    changeValueKeySearch,
    arrangeReleasesGridCharTable,
    getreleaseId,
    resetValueMiniExcute,
    resetValueMiniIssueStatus,
    resetValueMiniDashbroad,
} = releaseSlice.actions;

export default releaseSlice.reducer;
