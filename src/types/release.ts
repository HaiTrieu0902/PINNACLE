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

//releaseDetail
export interface releaseDetail {
    releaseId: number;
    releaseLabel: string;
    releaseTitle: string;
    releaseDescription: string;
    releaseComments: string;
    releaseOwner: string;
    ownerName: string;
    releaseWorkflow: string;
    releaseBusinessImportance: number;
    releaseType: number;
    targetReleaseStartDate: Date | string;
    targetReleaseEndDate: Date | string;
    targetReleaseDurationDays: number;
    releaseParentId: string | null;
    releaseCreatedBy: number;
    createdByName: string;
    releaseCreatedOn: Date | string;
    releaseAssignedTo: number;
    assignedToName: string;
    releaseAssignedOn: Date | string;
    modifiedBy: string | null;
    modifiedByName: string;
    modifiedOn: string | null;
    releaseApprovedBy: string | null;
    approvedByName: string;
    releaseApprovedOn: string | null;
    releaseDeployedBy: string | null;
    deployedByName: string;
    releaseDeployedOn: string | null;
    logicalDelete: number;
    deletionReason: string | null;
    folderId: number;
    reworkReason: string | null;
    duration: number;
    releaseScope: ReleaseScope;
}

export interface ReleaseScope {
    requirementCount: number;
    issueFixed: number;
    childRelease: number;
}

export interface releaseDetailList {
    releaseDetail: releaseDetail;
}
