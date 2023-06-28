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

// release Type
export interface releaseType {
    releaseTypeId: number;
    releaseTypeDescription: null | string;
}
export interface releaseTypeList {
    releaseType: releaseType[];
}

// business information
export interface BusinessImportant {
    businessImportanceId: number;
    businessImportanceDescription: string;
}

export interface releasesGanttChartList {
    releasesGanttChart: BusinessImportant[];
}

// Param add release
export interface ParamReleaseAdd {
    releaseId: number;
    releaseLabel: string;
    releaseTitle: string;
    releaseDescription: string;
    releaseComments: string;
    releaseOwner: number;
    releaseWorkflow: string;
    releaseBusinessImportance: number;
    releaseAssignedTo: number;
    releaseCreatedBy: number;
    targetReleaseStartDate: Date | any;
    targetReleaseEndDate: Date | any;
    targetReleaseDurationDays: number;
    releaseType: number;
    releaseParentId: number | null;
    logicalDelete: number;
    releaseAssignedOn: Date | string;
    releaseCreatedOn: Date | string;
}

export interface ParamReleaseDelete {
    releaseId: number;
    deleteReason: string;
}

// update release
export interface ParamReleaseUpdate {
    updateRelease: UpdateRelease;
    modifiedFieldReleases: ModifiedFieldRelease[];
}

export interface ModifiedFieldRelease {
    fieldName: string;
    oldValue: string | any;
    newValue: string | any;
}

export interface UpdateRelease {
    releaseId: number;
    releaseLabel: string;
    releaseTitle: string;
    releaseDescription: string;
    releaseComments: string;
    releaseOwner: number | any;
    releaseWorkflow: string;
    releaseBusinessImportance: number;
    modifiedBy: number | any;
    releaseType: number;
    releaseParentId: number | any;
    targetReleaseStartDate: Date | string | any;
    targetReleaseEndDate: Date | string | any;
    targetReleaseDurationDays: number;
}

// release grid Folder view
export interface releasesFolderChartList {
    releasesFolderChart: ReleasesFolderChart[];
    lastestReleaseId: number;
}

export interface ReleasesFolderChart {
    key: string;
    title: string;
    id: number;
    isChild: boolean;
    parentId: null | string;
    description: string;
    expandTypeOptional: number;
    expandedImageKey: number;
    isHighlighted: boolean;
    children: ReleasesFolderChart[];
}

// release Grid Folder
export interface ParamReleaseFolderView {
    parentFolderId: number;
    folderName: string;
    entityType: number;
    isSubFolder: boolean;
}

// get-release-workflow
export interface workflowAction {
    text: string;
    value: number;
}
[];

// MiniDashboardItemList
export interface MiniDashboardItemList {
    nameType: string;
    miniDashboardItems: MiniDashboardItem[];
}
[];

export interface MiniDashboardItem {
    name: string;
    backColor: string;
    panelBackColor: string;
    forceColor: string;
    value: number;
    valueString: string;
}

// releaseExcutionStatus
export interface releaseExcutionStatus {
    testCasesToExecute: number;
    testCasesInProgress: number;
    testCasesPassed: number;
    testCasesBlocked: number;
    testCasesFailed: number;
    testCasesTotal: number;
    testsToExecute: number;
    testsInProgress: number;
    testsPassed: number;
    testsBlocked: number;
    testsFailed: number;
    testsTotal: number;
    conditionsNotRun: number;
    conditionsInProgress: number;
    conditionsPassed: number;
    conditionsBlocked: number;
    conditionsFailed: number;
    conditionsTotal: number;
    testStepsNotRun: number;
    testStepsInProgress: number;
    testStepsPassed: number;
    testStepsBlocked: number;
    testStepsFailed: number;
    testStepsTotal: number;
}

// -release-issue-status
export interface releaseIssueStatusList {
    releaseIssueStatuss: releaseIssueStatuss[];
}
export interface releaseIssueStatuss {
    issueStatusValue: number;
    issueStatusName: string;
}
