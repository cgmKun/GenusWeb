import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Slider, InputNumber, Toast } from '@douyinfe/semi-ui';
import { clusterizeReport } from '../../graphql/fields';

class ClusterizeReport extends Component {
    static propTypes = {
        report: PropTypes.any
    }

    constructor() {
        super();

        this.state = {visible: false, sliderValue: 0};
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getSliderValue = this.getSliderValue.bind(this);
    }

    getSliderValue(value) {
        if (isNaN(Number(value))){
            return;
        }
        this.setState({ sliderValue: value / 1 });
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

        this.submitReportClusterization(report._id, report.sessionIds.length+1, this.state.sliderValue)

        Toast.info({
            content: `Creating clusters to ${report.reportTitle}. This Action might take some time to reflect on the web client`,
            duration: 5
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        const report = this.props.report;
        const sliderValue = this.state.sliderValue;

        if (!report) { 
            return;
        }

        return (
            <>
                <Button onClick={this.showDialog}>Clusterize Report</Button>
                <Modal
                    title="Clusterize Report"
                    visible={this.state.visible}
                    onOk={() => this.handleOk(report)}
                    onCancel={this.handleCancel}
                >
                    <p>{`The report "${report.reportTitle}" defects will be clusterized using the K-means algorithm. Please select the number of clusters desired`}</p>
                    <div style={{ width: 320, marginRight: 15, marginTop: 15 }}>
                        <p>The maximum number of clusters is 50</p>
                        <Slider step={1} value={sliderValue} onChange={(sliderValue) => (this.getSliderValue(sliderValue))} min={1} max={report.defects.length > 50 ? 50 : report.defects.length} ></Slider>
                        <InputNumber onChange={(v) => this.getSliderValue(v)} style={{width: 100}} value={sliderValue} min={1} max={report.defects.length > 50 ? 50 : report.defects.length} />
                    </div>
                </Modal>
            </>
        );
    }

    submitReportClusterization(reportId, sessionId, clusters) {
        const request = clusterizeReport(reportId, sessionId, clusters);

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
                    content: 'Clusterize Reports Error: ' + resData.errors[0].message,
                    duration: 3
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

export default ClusterizeReport;
