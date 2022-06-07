import React, { Component } from "react";
import { Row, Select } from '@douyinfe/semi-ui';

import { fetchReports } from '../graphql/fields'
import DashboardContent from "../components/Dashboard/DashboardContent";
// import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
// import GraphGroup from "../components/Dashboard/GraphGroup";
// import GroupsMetadata from "../components/Dashboard/GroupsMetadata";

import "../styles/Dashboard.scss"

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            reports: [],
            isLoading: true,
            currentReport: null,
            currentSessionId: null
        }
    }

    componentDidMount() {
        this.fetchReports();
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
            this.setState({ reports: reports, isLoading: false });
        }).catch(err => {
            console.log(err);
        });
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
                        loading={this.state.isLoading}
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
                <DashboardContent reportId={report._id} sessionId={sessionId}/>
            );
        }
    }
}

export default Dashboard;
