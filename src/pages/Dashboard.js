import React, { Component } from "react";
import { Typography, Row, Col, Select } from '@douyinfe/semi-ui';

import { fetchReports } from '../graphql/fields'
import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
import GraphGroup from "../components/Dashboard/GraphGroup";

import "../styles/Dashboard.scss"

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            reports: [],
            currentReport: null,
            currentSessionId: null
        }
    }

    componentDidMount() {
        this.fetchReports();
    }

    render () {
        const { Title } = Typography

        const reports = this.state.reports;

        return(
            <div className="container">
                <Row><Title>Seleccione un reporte</Title></Row>
                <Row>
                    <Select 
                        filter 
                        style={{ width: 240, marginRight: 20 }} 
                        placeholder={"Select a report"}
                        showClear={true}
                        onChange={(value) => {this.setState({ currentReport: value, currentSessionId: null });}}
                    >
                        {this.getReportLabels(reports)}
                    </Select>
                    {this.getReportGroups()}
                </Row>
                {this.getDashboardContent()}
            </div>
        )
    }

    fetchReports() {
        const request = fetchReports;

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

    getReportLabels(reports) {
        const labels = [];

        reports.forEach((report, index) => {
            labels.push(
                <Select.Option key={index} value={report}>{report.reportTitle}</Select.Option>
            )
        });

        return labels;
    }

    getReportGroups() {
        const report = this.state.currentReport;

        if (!report) {
            return;
        } else {
            return (
                <Select  
                    defaultValue={"Select a Group"}
                    onChange={(value) => {this.setState({ currentSessionId: value });}} 
                >
                    {this.getReportGroupsLabels(report.sessionIds)}
                </Select>
            )
        }
    }

    getReportGroupsLabels(sessionIds) {
        const labels = [];
        const test = this.state.currentSessionId

        sessionIds.forEach((sessionId, index) => {
            labels.push(
                <Select.Option key={index} value={sessionId}>{test}</Select.Option>
            )
        })

        return labels;
    }

    getDashboardContent() {
        const report = this.state.currentReport;
        const sessionId = this.state.currentSessionId;

        if (report && sessionId) { 
            return (
                <Row>
                    <Col md={9}>
                        <GraphGroup/>
                    </Col>
                    <Col md={15}>
                        <DefectsOnGroup/>
                    </Col>
                </Row>
            );
        }
    }
}

export default Dashboard;
