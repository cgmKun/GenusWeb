import React, { Component } from  "react";
import { Modal, Button, Form, Toast } from '@douyinfe/semi-ui';

class DeleteReport extends Component {
    constructor() {
        super();
        this.state = {visible: false, reports: []};
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.syncValidate = this.syncValidate.bind(this);
    }

    componentDidMount() {
        this.fetchReports();
    }

    syncValidate(values) {
        const errors = {};
        console.log(values)

        if(!values.report) {
            errors.report = 'Required Field'
        }

        if (Object.keys(errors).length === 0) {
            this.handleOk(values);
        } else {
            Toast.error({
                content: 'Please, fill all the required fields to continue',
                duration: 3,
            })
        }

        return errors;
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }

    handleOk(values) {
        this.setState({
            visible: false
        });

        this.deleteReport(values.report);
    }
    handleCancel() {
        this.setState({
            visible: false
        });
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

    render () {
        const reports = this.state.reports;

        return (
            <div>
                <Button onClick={this.showDialog}>Delete Report</Button>
                <Modal
                    title="Delete Report"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<></>}
                >
                    <Form validateFields={this.syncValidate}>
                        {
                            ({ formState }) => (
                                <>
                                    <Form.Select field="report" label="Report" style={{ width: 300 }}>
                                        {this.getFormLabels(reports)}
                                    </Form.Select>
                                    <code style={{marginTop: 30}}>{JSON.stringify(formState.values)}</code>
                                    <Button className="my-files-submit-button" htmlType='submit'>Submit</Button>
                                </>
                            )
                        }
                    </Form>
                </Modal>
            </div>
        )
    }

    getFormLabels (reports) {
        const items = [];

        reports.forEach((report, index) => {
            items.push(
                <Form.Select.Option key={index} value={report._id}>{report.reportTitle}</Form.Select.Option>
            )
        });
        
        return items
    }
}

export default DeleteReport;