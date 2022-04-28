import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';

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
            this.setState({reports: reports});
        }).catch(err => {
            console.log(err);
        });
    }

    tableColumns() {
        return [
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
        
        reports.forEach(report => {
            console.log(report.author)
        })

        return <Table className='report-table' columns={this.tableColumns()} dataSource={reports} pagination={{pageSize: 5}} loading={this.state.reports ? false : true} />;
    }
}

export default ReportsTable
