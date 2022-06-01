import moment from 'moment';

// -----------------------------------------------------------------------------------------------
// Reports
// -----------------------------------------------------------------------------------------------

export const fetchReports = { 
    query: `
        query {
            reports {
                _id
                reportTitle
                author
                submitDate
                sessionIds
                defects {
                    _id
                }
            }
        }
    ` 
}

export function createReport(report) {
    return {
        query: `
            mutation {
                createReport(reportInput: {reportTitle: "${report.reportTitle}", author: "${report.author}", submitDate: "${moment().format('DD/MM/YYYY')}"}) {
                    _id
                }
            }
        `
    }
}

export function deleteReportById(reportId) {
    return {
        query: `
            mutation {
                deleteReport(reportId: "${reportId}") {
                    reportTitle
                }
            }
        `
    }
}

export function clusterizeReport(reportId, sessionId, clusters) {
    return {
        query: `
            mutation {
                classifyReport(reportId:"${reportId}", sessionId:"${sessionId}", clusters:"${clusters}")
            }
        `
    }
}

// -----------------------------------------------------------------------------------------------
// Defects
// -----------------------------------------------------------------------------------------------

export function createDefects(defects, reportId) {
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

    return request;
}


// -----------------------------------------------------------------------------------------------
// Groups
// -----------------------------------------------------------------------------------------------

export function fetchGroupsByReportAndSessionId(reportId, sessionId) {
    return {
        query: `
            query {
                groupsByReportAndSessionId(reportId: "${reportId}", sessionId: "${sessionId}"){
                    groupTitle
                    submitDate
                    defects{
                        issueKey 
                        summary 
                        description
                    }
                    keywords
                }
            }
        `
    }
}
