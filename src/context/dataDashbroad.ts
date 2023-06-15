export const dataRelease = [
    {
        type: 'Draft',
        value: 27,
    },
    {
        type: 'Ready For Review',
        value: 25,
    },
    {
        type: 'Rework Required',
        value: 18,
    },
    {
        type: 'Approved',
        value: 15,
    },
    {
        type: 'Deployed',
        value: 15,
    },
];

export const configRelease = {
    appendPadding: 44,
    data: dataRelease,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
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
    // statistic: {
    //     title: false,
    //     content: {
    //         style: {
    //             whiteSpace: 'pre-wrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //             fontSize: 14,
    //         },
    //         content: 'Total\n100',
    //     },
    // },
};

export const dataRequiment = [
    {
        type: 'Draft',
        value: 22,
    },
    {
        type: 'Ready For Review',
        value: 10,
    },
    {
        type: 'Rework Required',
        value: 35,
    },
    {
        type: 'Approved',
        value: 13,
    },
    {
        type: 'Deprecated',
        value: 20,
    },
];

export const configRequiment = {
    appendPadding: 44,
    data: dataRequiment,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
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
    // statistic: {
    //     title: false,
    //     content: {
    //         style: {
    //             whiteSpace: 'pre-wrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //             fontSize: 14,
    //         },
    //         content: 'Total\n100',
    //     },
    // },
};

export const dataTestCase = [
    {
        type: 'Draft',
        value: 44,
    },
    {
        type: 'Ready For Review',
        value: 10,
    },
    {
        type: 'Rework Required',
        value: 33,
    },
    {
        type: 'Approved',
        value: 13,
    },
];

export const configTestcase = {
    appendPadding: 44,
    data: dataTestCase,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
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
    // statistic: {
    //     title: false,
    //     content: {
    //         style: {
    //             whiteSpace: 'pre-wrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //             fontSize: 14,
    //         },
    //         content: 'Total\n100',
    //     },
    // },
};

export const dataBatchs = [
    {
        type: 'Configuring',
        value: 25,
    },
    {
        type: 'Scheduled',
        value: 25,
    },
    {
        type: 'Executing',
        value: 25,
    },
    {
        type: 'Completed',
        value: 25,
    },
];

export const configBatchs = {
    appendPadding: 44,
    data: dataBatchs,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
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
    // statistic: {
    //     title: false,
    //     content: {
    //         style: {
    //             whiteSpace: 'pre-wrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //             fontSize: 14,
    //         },
    //         content: 'Total\n100',
    //     },
    // },
};

export const dataDefects = [
    {
        type: 'New',
        value: 50,
    },
    {
        type: 'Open',
        value: 44,
    },
    {
        type: 'Deferred',
        value: 4,
    },
    {
        type: 'Closed',
        value: 2,
    },
];

export const configDefects = {
    appendPadding: 44,
    data: dataDefects,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
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
    // statistic: {
    //     title: false,
    //     content: {
    //         style: {
    //             whiteSpace: 'pre-wrap',
    //             overflow: 'hidden',
    //             textOverflow: 'ellipsis',
    //             fontSize: 14,
    //         },
    //         content: 'Total\n100',
    //     },
    // },
};

export const columnDefect = [
    {
        city: '6/6',
        type: 'Severity 1',
        value: 14500,
    },
    {
        city: '6/6',
        type: 'Severity 2',
        value: 8500,
    },
    {
        city: '6/6',
        type: 'Severity 3',
        value: 10000,
    },
    {
        city: '6/6',
        type: 'Severity 4',
        value: 7000,
    },
    {
        city: '7/6',
        type: 'Severity 1',
        value: 9000,
    },
    {
        city: '7/6',
        type: 'Severity 2',
        value: 8500,
    },
    {
        city: '7/6',
        type: 'Severity 3',
        value: 11000,
    },
    {
        city: '7/6',
        type: 'Severity 4',
        value: 6000,
    },
    {
        city: '8/6',
        type: 'Severity 1',
        value: 16000,
    },
    {
        city: '8/6',
        type: 'Severity 2',
        value: 5000,
    },
    {
        city: '8/6',
        type: 'Severity 3',
        value: 6000,
    },
    {
        city: '8/6',
        type: 'Severity 4',
        value: 10000,
    },
    {
        city: '9/6',
        type: 'Severity 1',
        value: 14000,
    },
    {
        city: '9/6',
        type: 'Severity 2',
        value: 9000,
    },
    {
        city: '9/6',
        type: 'Severity 3',
        value: 10000,
    },
    {
        city: '9/6',
        type: 'Severity 4',
        value: 9000,
    },
    {
        city: '10/6',
        type: 'Severity 1',
        value: 14000,
    },
    {
        city: '10/6',
        type: 'Severity 2',
        value: 9000,
    },
    {
        city: '10/6',
        type: 'Severity 3',
        value: 10000,
    },
    {
        city: '10/6',
        type: 'Severity 4',
        value: 6000,
    },
    {
        city: '11/6',
        type: 'Severity 1',
        value: 9000,
    },
    {
        city: '11/6',
        type: 'Severity 2',
        value: 8500,
    },
    {
        city: '11/6',
        type: 'Severity 3',
        value: 10000,
    },
    {
        city: '11/6',
        type: 'Severity 4',
        value: 6000,
    },
    {
        city: '12/6',
        type: 'Severity 1',
        value: 17000,
    },
    {
        city: '12/6',
        type: 'Severity 2',
        value: 6000,
    },
    {
        city: '12/6',
        type: 'Severity 3',
        value: 7000,
    },
    {
        city: '12/6',
        type: 'Severity 4',
        value: 10000,
    },
    {
        city: '13/6',
        type: 'Severity 1',
        value: 18000,
    },
    {
        city: '13/6',
        type: 'Severity 2',
        value: 11000,
    },
    {
        city: '13/6',
        type: 'Severity 3',
        value: 15000,
    },
    {
        city: '13/6',
        type: 'Severity 4',
        value: 14000,
    },
];
