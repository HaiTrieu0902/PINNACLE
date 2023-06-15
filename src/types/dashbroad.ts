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
