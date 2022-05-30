import React, { Component } from 'react';
import { Modal, Button, Form, Toast } from '@douyinfe/semi-ui';
import moment from 'moment';


class CreateGroup extends Component {
    constructor() {
        super();

        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.syncValidate = this.syncValidate.bind(this);

        this.state = {
            reports: []
        };
    }

    componentDidMount() {
        this.fetchReports();
    }

    syncValidate(values) {
        const errors = {};

        if(!values.report) {
            errors.report = 'Required Field'
        }

        if(!values.groupTitle) {
            errors.groupTitle = 'Required Field'
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

    handleOk(values) {
        this.setState({
            visible: false
        });

        this.createGroup(values)
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }

    fetchReports() {
        const request = {
            query: `
                query {
                    reports {
                        _id
                        reportTitle
                        sessionIds
                        defects {
                            _id
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
            const reports = resData.data.reports;
            this.setState({reports: reports});
        }).catch(err => {
            console.log(err);
        });
    }
    
    createGroup(values) {
        console.log(values.report);
        console.log(values.groupTitle);

        let defectIdsRequest = "";
        values.report.defects.forEach(defect => {
            defectIdsRequest += `"${defect._id}", `
        });

        const request = {
            query: `
                mutation {
                    createGroup(groupInput: {
                        groupTitle: "${values.groupTitle}"
                        sessionId: "${values.report.sessionIds.length + 1}"
                        submitDate: "${moment().format('DD/MM/YYYY')}"
                        defects: [${defectIdsRequest}]
                        linkedReport: "${values.report._id}"
                    }) {
                        _id
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
                    content: 'Submit Group Error: ' + resData.errors[0].message,
                    duration: 3
                });
            } else {
                Toast.success({
                    content: 'Group Created Successfully',
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
                <Button onClick={this.showDialog}>Create Group</Button>
                <Modal
                    title="Create Group"
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
                                    <Form.Input field='groupTitle' label='Title' />
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
                <Form.Select.Option key={index} value={report}>{report.reportTitle}</Form.Select.Option>
            )
        });
        
        return items
    }
}

export default CreateGroup