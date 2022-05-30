import { React, Component } from "react";
import { Table, Toast } from '@douyinfe/semi-ui';
import { IconFolder } from '@douyinfe/semi-icons';

import { fetchReports, deleteReportById } from '../../graphql/fields'
import ClusterizeReport from "../Actions/ClusterizeReport";
import DeleteReport from "../Actions/DeleteReport";

class ReportsTable extends Component {
    constructor(){
        super();
        this.state = {
            reports: []
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
                loading={this.state.reports ? false : true} />
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
                sorter: (a, b) => a.updateTime - b.updateTime > 0 ? 1 : -1,
                render: (text) => {
                    return (
                        <div className="text-table-body">
                            {text}
                        </div>
                    );
                }

            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                render: (text, report) => { 
                    return (
                        <>
                            <ClusterizeReport />
                            <DeleteReport report={report}/>
                        </>
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
            this.setState({ reports: reports });
        }).catch(err => {
            console.log(err);
        });
    }

    deleteReport(reportId) {
        const request = deleteReportById(reportId)

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
            if (resData.errors) {
                Toast.error({
                    content: 'Submit Reports Error: ' + resData.errors[0].message,
                    duration: 3
                });
            } else {
                Toast.success({
                    content: resData.data.deleteReport.reportTitle + ' Deleted Successfully',
                    duration: 3,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

export default ReportsTable;
