import { React, Component } from "react";
import { Table, Modal, Button, Space } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';

//import DeffecTable from './DeffectTable';

class DefectsOnGroup extends Component {

    constructor() {
        super();
        this.state = { 
            groups: [],
            visible: false 
        };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.fetchReports();
    }

    fetchReports() {
        const request = {
            query: `
                query {
                    groupsByReportAndSessionId(reportId: "626b1ac49964b7b5a36e9dd1", sessionId: "2"){
                        defects{
                            issueKey summary description
                        }
                    }
                }
            `
        }

        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Falied POST');
            }

            return res.json();

        }).then(resData => {
            const group = resData.data.groupsByReportAndSessionId[0].defects; //Json ya formateado
            console.log(group)
            this.setState({ groups: group });
        }).catch(err => {
            console.log(err);
        });
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }
    handleOk() {
        this.setState({
            visible: false
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    tableColumns() {
        return [
            {
                title: 'N. Issue',
                dataIndex: 'issueKey',
                render: (text) => {
                    return (
                        <div>{text}</div>
                    );
                }
            },
            {
                title: 'Summary',
                dataIndex: 'summary',
                render: (text) => {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }

            },
            {
                title: '',
                dataIndex: 'description',
                render: () => {
                    return (
                        <>
                            <IconMore onClick={this.showDialog} />
                            <Modal
                                title="Information"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={
                                    <Button type="primary" onClick={this.handleOk}>
                                        Close
                                    </Button>
                                }
                            >
                                <div style={{ padding: 12, border: '1px solid var(--semi-color-border)', margin: 12 }}>
                                    <Space vertical align=''>
                                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Issue </span>
                                        <p
                                            style={{
                                                color: 'var(--semi-color-text-2)',
                                                margin: '4px 0',
                                                //width: 420,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {`DCM021CX0118-23971`}
                                        </p>
                                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Summary </span>
                                        <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                            {`QA - DE ReadyMix go Order Details screen showing blank screen`}
                                        </p>
                                        <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Description </span>
                                        <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                            {`QA - DE ReadyMix go Order Details screen showing blank screen_x000D_\n_x000D_\n*Data*_x000D_\nBauer@mailinator.com_x000D_\nCemex!2020_x000D_\n_x000D_\n*Steps*_x000D_\nLogin to Readymix go app using the above credentials (or any QA credentials)_x000D_\nselect the jobsite or all the jobsites_x000D_\nGo to any order with any status_x000D_\nOrder details screen will be blank_x000D_\n_x000D_\n*Expected Behaviour*_x000D_\nThe Order Details screen should show order specs._x000D_\n_x000D_\n !image-2021-12-27-13-35-35-519.png|thumbnail!`}
                                        </p>
                                    </Space>
                                </div>
                            </Modal>
                        </>
                    );
                }
            }
        ];
    }

    render() {
        const groups = this.state.groups; //

        return <Table className='report-table' columns={this.tableColumns()} dataSource={groups} pagination={{ pageSize: 10 }} />;
    }
}

export default DefectsOnGroup
