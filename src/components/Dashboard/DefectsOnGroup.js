import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';

class DefectsOnGroup extends Component {
    state = {
        groups: []
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
                            issueKey summary
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

        return <Table className='report-table' columns={this.tableColumns()} dataSource={groups} pagination={{ pageSize: 7 }} />;
    }
}

export default DefectsOnGroup
