import { React, Component } from "react";
import { Table, Button, Toast } from '@douyinfe/semi-ui';
import { IconFolder, IconDelete } from '@douyinfe/semi-icons';

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

    fetchReports() {
        const request = {
            query: `
                query {
                    reports {
                    _id
                        reportTitle
                    author
                    submitDate
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
            const reports = resData.data.reports;
            this.setState({ reports: reports });
        }).catch(err => {
            console.log(err);
        });
    }

    deleteReport(reportId) {
        const request = {
            query: `
                mutation {
                    deleteReport(reportId: "${reportId}") {
                        reportTitle
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
                title: '',
                dataIndex: 'operate',
                render: (text, record) => <Button icon={<IconDelete className="iDelete" />} theme='borderless' onClick={() => this.deleteReport(record._id)} />
            },
        ];
    }

    render() {
        const reports = this.state.reports;
        const handleRow = (record, index) => {
            if (index % 2 === 0) {
                return {
                    
                }
            } else {
                return {
                    style: {
                        background: 'rgb(217, 231, 255, 0.4)',
                    }
                };
            }
        };

        reports.forEach(report => {
            console.log(report.author)
        })

        return (
            <Table className="report-table"
                onHeaderRow={() => {
                    return {
                        className: 'header',
                    };
                }}
                onRow={handleRow} columns={this.tableColumns()}
                dataSource={reports} pagination={{ pageSize: 5 }}
                loading={this.state.reports ? false : true} />
        );
    }
}

export default ReportsTable
