import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';
import { IconFolder } from '@douyinfe/semi-icons';

import { fetchReports } from '../../graphql/fields'
import ClusterizeReport from "../Actions/ClusterizeReport";
import DeleteReport from "../Actions/DeleteReport";

class ReportsTable extends Component {
    constructor(){
        super();
        this.state = {
            reports: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetchReports();
    }

    render() {
        const reports = this.state.reports;

        return (
            <Table className="report-table"
                columns={this.tableColumns()}
                dataSource={reports} 
                pagination={{ pageSize: 5 }}
                loading={this.state.isLoading}
            />
        );
    }

    tableColumns() {
        return [
            {
                title: '',
                dataIndex: '',
                render: () => {
                    return (
                        <IconFolder style={{ color: '#FFAC00' }} size="extra-large" />
                    );
                }
            },
            {
                title: 'Report Name',
                dataIndex: 'reportTitle',
                render: (text) => {
                    return (
                        <div className="text-table-body" >{text}</div>
                    );
                }
            },
            {
                title: 'Author',
                dataIndex: 'author',
                render: (text) => {
                    return (
                        <div className="text-table-body" >{text}</div>
                    );
                }
            },
            {
                title: 'Submit Date',
                dataIndex: 'submitDate',
                sorter: (a, b) => a.submitDate - b.submitDate > 0 ? 1 : -1,
                render: (text) => {
                    return (
                        <div className="text-table-body">
                            {text}
                        </div>
                    );
                }

            },
            {
                title: 'Defect Count',
                dataIndex: 'defectCount',
                render: (text, report) =>  {
                    return (
                        <div>{report.defects.length}</div>
                    )
                }
            },
            {
                title: '',
                dataIndex: 'clusterized',
                render: (text, report) => { 
                    return (
                        <div>
                            <ClusterizeReport report={report}/>
                        </div>
                    )
                }
            },
            {
                title: '',
                dataIndex: 'actions',
                render: (text, report) => {
                    return (
                        <div>
                            <DeleteReport report={report} />
                        </div>
                    )
                }
            }
        ];
    }

    fetchReports() {
        const request = fetchReports;

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
            const reports = resData.data.reports;
            this.setState({ reports: reports, isLoading: false });
        }).catch(err => {
            console.log(err);
        });
    }
}

export default ReportsTable;
