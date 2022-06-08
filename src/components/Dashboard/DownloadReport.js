import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

class DownloadReport extends Component {
    static propTypes = {
        groups: PropTypes.any
    }
    
    render () {
        const groups = this.props.groups;

        if (!groups) {
            return;
        }

        const formattedData = this.getFormattedData()

        return (
            <CSVLink {...formattedData}>Export To CSV</CSVLink>
        );
    }
    
    getFormattedData() {
        const groups = this.props.groups;
        const formattedData = [];
        const headers = [
            { label: "Defect", key: "defect" },
            { label: "Status", key: "status" },
            { label: "Severity", key: "severity" },
            { label: "Project Key", key: "projectKey" },
            { label: "Issue Type", key: "issueType" },
            { label: "Created", key: "created" },
            { label: "Assignee", key: "assignee" },
            { label: "Digital Service", key: "digitalService" },
            { label: "Summary", key: "summary" },
            { label: "Description", key: "description" },
            { label: "Group", key: "group" }
        ];

        groups.forEach((group) => {
            group.defects.forEach((defect) => {
                formattedData.push(
                    {
                        issueKey: defect.issueKey,
                        status: defect.status,
                        priority: defect.priority,
                        severity: defect.severity,
                        projectKey: defect.projectKey,
                        issueType: defect.issueKey,
                        created: defect.created,
                        assignee: defect.assignee,
                        digitalService: defect.digitalService,
                        summary: defect.summary,
                        description: defect.description,
                        group: group.groupTitle
                    }
                )
            })
        })

        const csvReport = {
            filename: `ClusteredReport.csv`,
            headers: headers,
            data: formattedData
        }

        return csvReport;
    }
}

export default DownloadReport;
