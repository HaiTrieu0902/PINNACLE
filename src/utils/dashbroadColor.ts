import { WorkflowItems } from '../types/dashbroad';
import { releaseIssueStatuss } from '../types/release';
export const handleColorWorkflowItems = (workflowItems: WorkflowItems[]) => {
    return workflowItems?.map((item) => {
        return item?.backColor ? item.backColor : '';
    });
};

export const generatePieChartConfig = (data: WorkflowItems[]) => {
    return {
        appendPadding: 30,
        data: data,
        angleField: 'value',
        colorField: 'text',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            autoRotate: false,
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        color: handleColorWorkflowItems(data),
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
};

export const generatePieChartConfigRelease = (data: releaseIssueStatuss[]) => {
    return {
        appendPadding: 10,
        data,
        angleField: 'issueStatusValue',
        colorField: 'issueStatusName',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            autoRotate: false,
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
};
