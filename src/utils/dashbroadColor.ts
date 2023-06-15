import { WorkflowItems } from '../types/dashbroad';
export const handleColorWorkflowItems = (workflowItems: WorkflowItems[]) => {
    return workflowItems?.map((item) => {
        return item?.backColor ? item.backColor : '';
    });
};
