import { React, Component } from "react";
import { Table, Modal} from '@douyinfe/semi-ui';
import autoBind from "react-autobind";
//import { IconMore } from '@douyinfe/semi-icons';

//import DeffecTable from './DeffectTable';

const getRowKey = record => {
    return `${record.key}`;
};

class TableDefects extends Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
        this.state = {
            groups: [],
            selectedRowKey: null,
            visible: false

        };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    setRowKey(record) {
        const selectedRowKey = getRowKey(record);
        console.log(record);
        console.log(selectedRowKey, typeof selectedRowKey);
        this.setState({ selectedRowKey });
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
                                this.setState({ visible: true });
                                this.setRowKey(record);
                            }
                        };
                    }}
                />

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }
}

export default TableDefects
