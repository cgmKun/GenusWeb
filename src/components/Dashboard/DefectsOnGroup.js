import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';
//import { IconMore } from '@douyinfe/semi-icons';

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
                        <></>
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
