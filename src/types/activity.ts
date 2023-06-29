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
