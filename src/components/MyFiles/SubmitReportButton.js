import React, { Component } from "react";
import Papa from "papaparse";
import { Modal, Button, Form, useFormApi, Upload, Toast } from '@douyinfe/semi-ui';
import '../../styles/MyFiles/SubmitReportButton.scss'

class SubmitReportButton extends Component {
    constructor() {
        super();
        this.state = { visible: false };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.syncValidate = this.syncValidate.bind(this);
    }

    syncValidate(values) {
        const errors = {};
    
        if (!values.reportTitle) {
            errors.reportTitle = 'Required Field';
        }

        if (!values.author) {
            errors.author = 'Required Field';
        }

        if (!values.defects) {
            errors.defects = 'Required Field';
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

        this.createReport(values);
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    createReport(values) {
        const request = { //TODO: ADD THE SUBMIT DATE TO THE MUTATION QUERY
            query: `
                mutation {
                    createReport(reportInput: {reportTitle: "${values.reportTitle}", author: "${values.author}", submitDate: "MOVER A MOMENT.JS LAS FECHAS"}) {
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
                    content: 'Submit Error: ' + resData.errors[0].message,
                    duration: 3
                });
            } else {
                Toast.success({
                    content: 'File Uploaded Successfully',
                    duration: 3,
                });

                // TODO: REVISE THE AWAIT ON THE FIRST ELEMENT WHEN MUTATING THE DB WITH GRAPH QL
                // TODO: REVISE WHY WITH THE TEST DATA IT DOES NOT WAIT THE INFORMATION AS REQUIRED
                // TODO: CHECK IF YOU CAN MAKE A THEN CATCH ROUTINE FOR THIS PART OF THE CODE
                this.createDefect(values.defects[0], resData.data.createReport._id); 

                if (values.defects.length > 1) {
                    values.defects.forEach(defect => {
                        this.createDefect(defect, resData.data.createReport._id);
                    });
                }
            }

        }).catch(err => {
            Toast.error({
                content: 'Network Error: Failed to submit a new report',
                duration: 3
            });

            console.log(err);
        });
    }

    createDefect(defect, reportId) {
        console.log(defect)
        const request = {
            query: `
                mutation {
                    createDefect(defectInput: {
                        issueKey: "${defect.issueKey}",
                        status: "${defect.status}",
                        priority: "${defect.priority}",
                        severity: "${defect.severity}",
                        projectKey: "${defect.projectKey}",
                        issueType: "${defect.issueType}",
                        created: "${defect.created}",
                        assignee: "${defect.assignee}",
                        digitalService: "${defect.digitalService}",
                        summary: "${defect.summary}",
                        description: "${defect.description.replace(/\r?\n|\r/g, " ")}",
                        linkedReport: "${reportId}"
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
            console.log(resData);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const UploadField = () => {
            const formApi = useFormApi();

            const mockRequest = ({ file, onSuccess }) => {
                Papa.parse(file.fileInstance, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        formApi.setValue('defects', results.data);
                    },
                });

                onSuccess();
                return;
            };

            return (
                <Upload
                    action=""
                    customRequest={mockRequest}
                    draggable={true}
                    dragMainText="Click to upload the file or drag and drop the file here"
                    dragSubText="Support any type of file"
                    accept=".csv"
                ></Upload>
            );
        };

        return(
            <div>
                <Button onClick={() => this.showDialog()}>UPLOAD FILE</Button>
                <Modal
                    title="Submit New Report"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<></>}
                >
                    <Form validateFields={this.syncValidate} layout='vertical'>
                        <Form.Input field='reportTitle' label='Title' />
                        <Form.Input field='author' label='Author' />
                        <Form.Slot field='defects' label='Input File'>
                            <UploadField />
                        </Form.Slot>
                        <Button className="my-files-submit-button" htmlType='submit'>Submit</Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default SubmitReportButton;