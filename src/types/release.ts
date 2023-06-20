export interface releaseGridDtos {
    businessImportance: string;
    businessImportanceId: number;
    folderId: number;
    id: number;
    owner: string;
    releaseParentId: string | null;
    title: string | any;
    type: string | any;
}

export interface folderGrid {
    folderId: number;
    folderName: string | null;
    folderNameShow: string;
    parentFolderId: string | null;
}

export interface releasesGridChartList {
    lastestReleaseId: number;
    // releasesGridChart: [
    //     {
    //         folderGrid: folderGrid;
    //         releaseGridDtos: releaseGridDtos[];
    //     },
    // ];
    releasesGridChart: {
        folderGrid: folderGrid;
        releaseGridDtos: releaseGridDtos[];
    }[];
}
