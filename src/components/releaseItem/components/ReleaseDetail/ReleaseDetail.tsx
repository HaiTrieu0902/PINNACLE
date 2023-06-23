import { Card, Col, DatePicker, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../../App';
import { API_PATHS } from '../../../../configs/api';
import { axiosData } from '../../../../configs/axiosApiCusomer';
import {
    getBusinessImportance,
    getReleaseChart,
    getReleaseDetail,
    getReleaseType,
} from '../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { ParamReleaseUpdate } from '../../../../types/release';
import './ReleaseDetail.scss';
const ReleaseDetail = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseDetailList, releaseTypeList, releasesGanttChartList, releaseId } = useAppSelector(
        (state) => state.release,
    );
    type ValidReleaseDetailKeys = keyof typeof releaseDetailList.releaseDetail;
    const [releaseValues, setReleaseValues] = useState({
        releaseLabel: releaseDetailList?.releaseDetail?.releaseLabel || '',
        releaseTitle: releaseDetailList?.releaseDetail?.releaseTitle || '',
        releaseDescription: releaseDetailList?.releaseDetail?.releaseDescription || '',
        releaseComments: releaseDetailList.releaseDetail.releaseComments || '',
    });
    const [valueBusinessImportant, setValueBusinessImportant] = useState<number>(0);

    // call API release type list
    useEffect(() => {
        const releaseType = dispatch(getReleaseType());
        const businessImportant = dispatch(getBusinessImportance());
        return () => {
            releaseType.abort();
            businessImportant.abort();
        };
    }, [dispatch]);

    // change value business Importance
    useEffect(() => {
        setValueBusinessImportant(releaseDetailList?.releaseDetail?.releaseBusinessImportance);
        setReleaseValues({
            releaseLabel: releaseDetailList?.releaseDetail?.releaseLabel,
            releaseTitle: releaseDetailList?.releaseDetail?.releaseTitle,
            releaseDescription: releaseDetailList?.releaseDetail?.releaseDescription,
            releaseComments: releaseDetailList.releaseDetail.releaseComments,
        });
    }, [releaseDetailList]);

    // handle changed value
    const handleInputValueChange = (event: ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = event.target;
        setReleaseValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // handle blur value change(API change)
    const handleInputValueBlur = async (event: ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = event.target;
        setReleaseValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        const param: ParamReleaseUpdate = {
            modifiedFieldReleases: [
                {
                    fieldName: name,
                    oldValue: releaseDetailList?.releaseDetail?.[name as ValidReleaseDetailKeys],
                    newValue: value,
                },
            ],
            updateRelease: {
                releaseId: Number(releaseId),
                releaseLabel: releaseValues?.releaseLabel,
                releaseTitle: releaseValues?.releaseTitle,
                releaseDescription: releaseValues?.releaseDescription,
                releaseComments: releaseValues?.releaseComments,
                releaseOwner: '2',
                releaseWorkflow: 'Draft',
                releaseBusinessImportance: 2,
                modifiedBy: 2,
                releaseType: 11,
                releaseParentId: 0,
                targetReleaseStartDate: '2023-06-12T17:00:00',
                targetReleaseEndDate: '2023-06-23T17:00:00',
                targetReleaseDurationDays: 12,
            },
        };

        if (releaseDetailList?.releaseDetail?.[name as ValidReleaseDetailKeys] === value) {
            console.log('cancel release');
        } else {
            const url = `${API_PATHS.API}/Releases/update-release`;
            const data = await axiosData(url, 'POST', param);
            messageApi.success(`Release ${releaseId} has successfully been Updated.`);
            dispatch(getReleaseChart());
            dispatch(getReleaseDetail(Number(releaseId)));
            return data;
        }
    };

    return (
        <div className="release-detail-container">
            <Card className="sub-title-common" title="Summary" bordered={true} size="small" style={{ width: '100%' }}>
                <Row gutter={[10, 10]}>
                    <Col span={8}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">Label :</span>
                            <Input
                                name="releaseLabel"
                                value={releaseValues.releaseLabel}
                                className="input-inline-custom"
                                onChange={handleInputValueChange}
                                onBlur={handleInputValueBlur}
                            />
                        </div>
                    </Col>
                    <Col span={9}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">Title :</span>
                            <Input
                                name="releaseTitle"
                                value={releaseValues.releaseTitle}
                                className="input-inline-custom"
                                onChange={handleInputValueChange}
                                onBlur={handleInputValueBlur}
                            />
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">
                                Workflow :{' '}
                                <span className="input-inline-custom">
                                    {releaseDetailList?.releaseDetail?.releaseWorkflow}
                                </span>
                            </span>
                            <span style={{ height: '30px' }}></span>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[10, 10]} className="mt-3">
                    <Col span={8}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">
                                Id :
                                <span className="input-inline-custom">
                                    {' '}
                                    {releaseDetailList.releaseDetail.releaseId}
                                </span>
                            </span>
                            <span style={{ height: '30px' }}></span>
                        </div>
                    </Col>
                    <Col span={9}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">Type :</span>
                            <Select
                                className="select-inline-custom"
                                value={releaseDetailList?.releaseDetail?.releaseType || undefined}
                                style={{ width: 150 }}
                                options={releaseTypeList.releaseType
                                    .filter((item) => item.releaseTypeDescription !== null)
                                    .map((item) => ({
                                        value: item.releaseTypeId,
                                        label: item.releaseTypeDescription,
                                    }))}
                            />
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className="flex gap-2 items-center">
                            <span className="label-common">
                                Owner :{' '}
                                <span className="input-inline-custom !text-[#dd5c86]">
                                    {releaseDetailList.releaseDetail.ownerName}
                                </span>
                            </span>
                            <span style={{ height: '30px' }}></span>
                        </div>
                    </Col>
                </Row>
            </Card>

            <div className="release-right__content">
                <div className="mt-2 pr-2">
                    {/* Release Schedule */}
                    <Card
                        className="sub-title-common"
                        title="Release Schedule"
                        bordered={true}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[10, 10]}>
                            <Col span={8}>
                                <div className="flex flex-col gap-2">
                                    <span className="label-common">Start Date :</span>
                                    <DatePicker
                                        value={dayjs(
                                            releaseDetailList.releaseDetail.targetReleaseStartDate,
                                            'YYYY-MM-DD',
                                        )}
                                        format={'YYYY-MM-DD'}
                                    />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex flex-col gap-2">
                                    <span className="label-common">End Date :</span>
                                    <DatePicker
                                        value={dayjs(
                                            releaseDetailList.releaseDetail.targetReleaseEndDate,
                                            'YYYY-MM-DD',
                                        )}
                                        format={'YYYY-MM-DD'}
                                    />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex gap-3 items-center">
                                    <span className="label-common">
                                        Duration :{' '}
                                        <span className="input-inline-custom">
                                            {releaseDetailList.releaseDetail.duration}
                                        </span>
                                    </span>
                                    <span className="label-common">Days</span>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* Release Scope */}
                    <Card
                        className="sub-title-common mt-2"
                        title="Release Scope"
                        bordered={true}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[10, 10]}>
                            <Col span={8}>
                                <div className="flex flex-col gap-2">
                                    <span className="label-common">
                                        Requirements :{' '}
                                        <span className="input-inline-custom">
                                            {releaseDetailList?.releaseDetail?.releaseScope?.requirementCount}
                                        </span>
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex flex-col gap-2">
                                    <span className="label-common">
                                        Issue Fixed :{' '}
                                        <span className="input-inline-custom">
                                            {releaseDetailList?.releaseDetail?.releaseScope?.issueFixed}
                                        </span>
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex gap-3 items-center">
                                    <span className="label-common">
                                        Child Releases :{' '}
                                        <span className="input-inline-custom">
                                            {' '}
                                            {releaseDetailList?.releaseDetail?.releaseScope?.childRelease}
                                        </span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* Release Importance */}
                    <Card
                        className="sub-title-common mt-2"
                        title="Release Importance"
                        bordered={true}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <div className="flex items-center gap-2">
                                    <span className="label-common">Business Importance:</span>
                                    <Select
                                        className="select-inline-custom !w-[70%]"
                                        style={{ width: 150 }}
                                        value={valueBusinessImportant || undefined}
                                        options={releasesGanttChartList?.releasesGanttChart.map((item) => ({
                                            value: item.businessImportanceId,
                                            label: item.businessImportanceDescription,
                                        }))}
                                        onChange={(selectedValue) => setValueBusinessImportant(selectedValue)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* Release Detail */}
                    <Card
                        className="sub-title-common mt-2"
                        title="Release Detail"
                        bordered={true}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <div className="flex flex-col">
                                    <span className="label-common">Description :</span>
                                    <TextArea
                                        name="releaseDescription"
                                        value={releaseValues.releaseDescription}
                                        style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }}
                                        onChange={handleInputValueChange}
                                        onBlur={handleInputValueBlur}
                                    />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="flex flex-col">
                                    <span className="label-common">Comments : </span>
                                    <TextArea
                                        name="releaseComments"
                                        value={releaseValues.releaseComments}
                                        style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }}
                                        onChange={handleInputValueChange}
                                        onBlur={handleInputValueBlur}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ReleaseDetail;
