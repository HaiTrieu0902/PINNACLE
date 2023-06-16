export interface WorkflowItems {
    text: string;
    value: number;
    backColor: string | null;
}

export interface releaseWorkflowList {
    releaseWorkflow: {
        workflowItems: WorkflowItems[];
        total: string | null;
    };
    releaseCustom: WorkflowItems[];
}

export interface requirementWorkflowList {
    requirementWorkflow: {
        workflowItems: WorkflowItems[];
        total: string | null;
    };
    requirementCustom: WorkflowItems[];
    requirementRisk: WorkflowItems[];
}

export interface testCaseWorkflowList {
    testCaseWorkflow: {
        workflowItem: WorkflowItems[];
        total: string | null;
    };
    testCaseCustom: WorkflowItems[];
    testCaseException: WorkflowItems[];
}

export interface batchWorkflowDashboardList {
    batchWorkflowDashboard: {
        workflowItem: WorkflowItems[];
        total: string | null;
    };
    batchExceptionDashboard: WorkflowItems[];
}

export interface defectWorkflowList {
    defectWorkflow: {
        workflowItems: WorkflowItems[];
        total: '';
    };
    defectExceptions: WorkflowItems[];
    defectRisk: WorkflowItems[];
}

export interface defectTrendWork {
    dateCurrent: string;
    dateCurrentString: string;
    totalDefect: number;
    serverity: number;
    serverityName: string;
    backColor: string;
}

export interface defectTrendWorkList {
    defectTrendWork: defectTrendWork;
}

export interface batchDaisy {
    totalRuns: number;
    dateStarted: string;
}

export interface batchDaisyList {
    defectTrendWork: batchDaisy;
}

export interface batchDailyExcute {
    fromDate: string;
    toDate: string;
    Type: string;
}
