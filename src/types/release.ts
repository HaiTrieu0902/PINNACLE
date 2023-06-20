export interface releaseGridDtos {
    businessImportance: string;
    businessImportanceId: number;
    folderId: number;
    id: number;
    owner: string;
    releaseParentId: string | null;
    title: string | null;
    type: string | null;
}

export interface folderGrid {
    folderId: number;
    folderName: string | null;
    folderNameShow: string;
    parentFolderId: string | null;
}

export interface releasesGridChartList {
    lastestReleaseId: number | string;
    releasesGridChart: [
        {
            folderGrid: folderGrid;
            releaseGridDtos: releaseGridDtos[];
        },
    ];
}
