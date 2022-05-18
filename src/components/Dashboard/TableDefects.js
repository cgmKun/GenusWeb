import { React, Component } from "react";
import { Table, Modal, Button, Space} from '@douyinfe/semi-ui';
import autoBind from "react-autobind";
//import { IconMore } from '@douyinfe/semi-icons';

//import DeffecTable from './DeffectTable'; , record.summary, record.description

const getRowKey = record => {
    return `${record.issueKey}`;
};

class TableDefects extends Component {

    constructor() {
        super();
        autoBind(this);
        this.state = {
            groups: [],
            selectedRowKey: null,
            infoRow: [],
            visible: false

        };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    setRowKey(record) {
        const selectedRowKey = getRowKey(record);
        //console.log(record);
        //console.log(selectedRowKey, typeof selectedRowKey);
        this.setState({ selectedRowKey: selectedRowKey});
        //console.log(this.state.selectedRowKey);
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

            }
        ];
    }

    render() {
        const groups = this.state.groups; //
        const { selectedRowKey } = this.state;


        return (
            <>
                <Table
                    className='report-table'
                    columns={this.tableColumns()}
                    dataSource={groups}
                    pagination={{ pageSize: 10 }}

                    rowKey={record => getRowKey(record)}
                    rowClassName={record =>
                        getRowKey(record) === selectedRowKey ? "highlighted" : ""
                    }
                    onRow={record => {
                        return {
                            onClick: () => {
                                this.setState({ visible: true, infoRow: record});
                                this.setRowKey(record);
                            }
                        };
                    }}
                />

                <Modal
                    title="Information"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        <Button type="primary" onClick={this.handleOk}>
                            Cerrar
                        </Button>
                    }
                >
                    <div style={{padding: 12, border: '1px solid var(--semi-color-border)', margin: 12}}>
                        <Space vertical align="">
                            <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}> Issue </span>
                            <p
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    margin: '4px 0',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {this.state.infoRow.issueKey}
                            </p>
                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Summary </span>
                            <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0'}}>
                                {this.state.infoRow.summary}
                            </p>
                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}> Description </span>
                            <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                {this.state.infoRow.description}
                            </p>
                        </Space>
                    </div>
                </Modal>
            </>
        );
    }
}

export default TableDefects
