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
            }
        }
    ` 
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

// -----------------------------------------------------------------------------------------------
// Groups
// -----------------------------------------------------------------------------------------------

export function fetchGroupsByReportAndSessionId(reportId, sessionId) {
    return {
        query: `
            query {
                groupsByReportAndSessionId(reportId: "${reportId}", sessionId: "${sessionId}"){
                    groupTitle
                    defects{
                        issueKey 
                        summary 
                        description
                    }
                }
            }
        `
    }
}
