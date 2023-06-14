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
