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
export interface releaseScopeList {
    releaseScope: releaseScope[];
}

export interface releaseScope {
    key: string;
    title: string;
    isChild: boolean;
    children: releaseScope[];
}

// ==================================================
