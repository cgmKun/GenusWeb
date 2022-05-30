import React, { Component } from "react";
import Papa from "papaparse";
import moment from 'moment';

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

        Toast.info({
            content: 'Uploading Report',
            duration: 2
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    createReport(values) {
        const request = {
            query: `
                mutation {
                    createReport(reportInput: {reportTitle: "${values.reportTitle}", author: "${values.author}", submitDate: "${moment().format('DD/MM/YYYY')}"}) {
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
                this.createDefects(values.defects, resData.data.createReport._id);
            }            

        }).catch(err => {
            Toast.error({
                content: 'Network Error: Failed to submit a new report',
                duration: 3
            });

            console.log(err);
        });
    }

    createDefects(defects, reportId) {
        let defectsQuery = "";
        
        defects.forEach(defect => {
            defectsQuery += `
                        {
                            issueKey: "${defect.issueKey.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            status: "${defect.status.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            priority: "${defect.priority.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            severity: "${defect.severity.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            projectKey: "${defect.projectKey.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            issueType: "${defect.issueType.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            created: "${defect.created.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            assignee: "${defect.assignee.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            digitalService: "${defect.digitalService.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            summary: "${defect.summary.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            description: "${defect.description.replace(/\r?\n|\r/g, " ").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').replaceAll('', '')}",
                            linkedReport: "${reportId}"
                        },
            `
        })

        const request = {
            query: `
                mutation {
                    createDefects(defects: [
                        ${defectsQuery}
                    ]) {
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
                    content: 'Submit Reports Error: ' + resData.errors[0].message,
                    duration: 3
                });
            } else {
                Toast.success({
                    content: 'File Uploaded Successfully',
                    duration: 3,
                });
            }
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

export default SubmitReportButton
