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
        }
        
        Toast.error({
            content: 'Please, fill all the required fields to continue',
            duration: 3,
        })

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

        Toast.success({
            content: 'File Uploaded Successfully',
            duration: 3,
        })

        console.log(values);
    }

    handleCancel() {
        this.setState({
            visible: false
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