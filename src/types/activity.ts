// Activity component type
export interface Activity {
    timestamp: Date;
    timeStampString: string;
    field: string;
    oldValue: string | any;
    newValue: string;
    modifiedBy: string;
}

export interface ActivityHistoryList {
    releaseHistory: Activity[];
}

// Activity Release Scope

export interface releaseScope {
    key: string;
    title: string;
    isChild: boolean;
    children: releaseScope[];
}

export interface releaseScopeList {
    releaseScope: releaseScope[];
}

export interface ReleaseScopeListAdd {
    releaseScope: releaseScope[];
}

// ==================================================
// Activity Release Scope
export interface ReleaseDefectCoverageList {
    releaseDefectCoverage: releaseScope[];
}

export interface ReleaseDefectCoverageListAdd {
    releaseDefectCoverage: releaseScope[];
}

// ==================================================
// Activity Attachments
export interface Attachment {
    attachmentId: number;
    attachmentDescription: string;
    fileName: string;
    attachedByName: string;
    attachedOn: Date;
    attachedBy: number;
}

export interface AttachmentsList {
    count: number;
    attachments: Attachment[];
}
