import React, { Component } from "react";
import { Row, Col, Select } from '@douyinfe/semi-ui';

import { fetchReports } from '../graphql/fields'
import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
import GraphGroup from "../components/Dashboard/GraphGroup";
import GroupsMetadata from "../components/Dashboard/GroupsMetadata";

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

    componentDidMount() {
        this.fetchReports();
    }

    render () {
        const reports = this.state.reports;

        return(
            <div className="dashboard-content">
                <Row className="selectors">
                    <Select
                        filter
                        className="report-selector"
                        placeholder={"Select a report"}
                        showClear={true}
                        onChange={(value) => { this.setState({ currentReport: value, currentSessionId: null }); }}
                    >
                        {this.getReportLabels(reports)}
                    </Select>
                    {this.getReportGroups()} 
                </Row>
                {this.getDashboardContent()}
            </div>
        )
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
                    placeholder={report.sessionIds.length === 0 ? "No Sessions Available" : "Select a Session ID"}
                    disabled={report.sessionIds.length === 0}
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
                <>
                    <Row>
                        <Col md={2} style={{ paddingRight: '10px' }} >
                            <GroupsMetadata reportId={report._id} sessionId={sessionId} />
                        </Col>
                        <Col md={10} style={{ paddingRight: '10px'}}>
                            <GraphGroup reportId={report._id} sessionId={sessionId}/>
                        </Col>
                        <Col md={12}>
                            <DefectsOnGroup reportId={report._id} sessionId={sessionId}/>
                        </Col>
                    </Row>
                </>
            );
        }
    }
}

export default Dashboard;
