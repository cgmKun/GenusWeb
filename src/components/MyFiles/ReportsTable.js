import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';
import { IconFolder } from '@douyinfe/semi-icons';

class ReportsTable extends Component {
    state = {
        reports: []
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
                        <div>{text}</div>
                    );
                }
            },
            {
                title: 'Author',
                dataIndex: 'author',
            },
            {
                title: 'Submit Date',
                dataIndex: 'submitDate',
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
        const reports = this.state.reports;
        const handleRow = (record, index) => {
            if (index % 2 === 0) {
                return {
                    style: {
                        background: 'rgb(217, 231, 255, 0.5)',
                    }
                };
            } else {
                return {};
            }
        };

        reports.forEach(report => {
            console.log(report.author)
        })

        return <Table className='report-table' onRow={handleRow} columns={this.tableColumns()} dataSource={reports} pagination={{ pageSize: 5 }} loading={this.state.reports ? false : true} />;
    }
}

export default ReportsTable
