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
