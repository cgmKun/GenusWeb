import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Button } from '@douyinfe/semi-ui';

import "../../styles/Dashboard.scss"

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
            <Button className='download-button'> <CSVLink {...formattedData}>Export To CSV</CSVLink> </Button>
        );
    }
    
    getFormattedData() {
        const groups = this.props.groups;
        const formattedData = [];
        const headers = [
            { label: "Issue Key", key: "issueKey" },
            { label: "Status", key: "status" },
            { label: "Priority", key: "priority" },
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

        groups.forEach((group) => {

            formattedData.push(
                {
                    issueKey: `Keywords_${group.groupTitle}`,
                    status: "Keyword",
                    priority: "Score",
                    severity: "",
                    projectKey: "",
                    issueType: "",
                    created: "",
                    assignee: "",
                    digitalService: "",
                    summary: "",
                    description: "",
                    group: ""
                }
            )

            group.keywords.forEach((keyword) => {
                const keyword_data = keyword.split(": ")

                formattedData.push(
                    {
                        issueKey: "",
                        status: keyword_data[0],
                        priority: keyword_data[1].toString(),
                        severity: "",
                        projectKey: "",
                        issueType: "",
                        created: "",
                        assignee: "",
                        digitalService: "",
                        summary: "",
                        description: "",
                        group: ""
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
