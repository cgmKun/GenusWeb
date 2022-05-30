import React, { Component } from  "react";
import { Button, Modal, Toast } from '@douyinfe/semi-ui';
import PropTypes from 'prop-types';
import { IconDelete } from '@douyinfe/semi-icons';
import { deleteReportById } from '../../graphql/fields'


class DeleteReport extends Component {
    static propTypes = {
        report: PropTypes.any
    }

    constructor() {
        super();
        
        this.state = {visible: false};
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showDialog() {
        this.setState({
            visible: true
        });
    }

    handleOk(report) {
        this.setState({
            visible: false
        });

        this.deleteReport(report._id);

        Toast.info({
            content: `Deleting ${report.reportTitle}`,
            duration: 2
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        const report = this.props.report;

        if (!report) {
            return;
        }

        return (
            <>
                <Button icon={<IconDelete className="iDelete" />} theme='borderless' onClick={this.showDialog} />
                <Modal
                    title="Delete Report"
                    visible={this.state.visible}
                    onOk={() => {this.handleOk(report)}}
                    onCancel={this.handleCancel}
                    closeOnEsc={true}
                >
                    {report.reportTitle} will be deleted from the database permanently. Do you wish to proceed?
                </Modal>
            </>
        )
    }

    deleteReport(reportId) {
        const request = deleteReportById(reportId);

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

export default DeleteReport;
