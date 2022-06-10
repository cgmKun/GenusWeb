import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from '@douyinfe/semi-ui';

import { fetchGroupsByReportAndSessionId } from "../../graphql/fields";
import DefectsOnGroup from "../Dashboard/DefectsOnGroup";
import GraphGroup from "../Dashboard/GraphGroup"
import GroupsMetadata from "../Dashboard/GroupsMetadata";

class DashboardContent extends Component {
    static propTypes = {
        reportId: PropTypes.any,
        sessionId: PropTypes.any
    }

    constructor() {
        super();
    
        this.state = {
            groups: [],
            isLoading: true
        };
    }

    fetchGroupsByReportAndSessionId() {
        const request = fetchGroupsByReportAndSessionId(this.props.reportId, this.props.sessionId);

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
            const group = resData.data.groupsByReportAndSessionId;
            this.setState({ groups: group, isLoading: false });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.fetchGroupsByReportAndSessionId();
    }
    
    render () {
        const groups = this.state.groups;

        if (!groups) {
            return;
        }

        if (this.state.isLoading) {
            return (this.getLoader());
        }

        return (
            <>
                <Row>
                    <Col md={12} style={{ paddingRight: '10px'}}>
                        <GroupsMetadata groups={groups} />
                        <GraphGroup groups={groups}/>
                    </Col>
                    <Col md={12}>
                        <DefectsOnGroup groups={groups}/>
                    </Col>
                </Row>
            </>
        );
    }

    getLoader() {
        return (
            <div style={{ marginLeft: 10 }}>
                <Spin tip={"Loading Results"} style={{ width: 120, marginTop: 30 }} />
            </div>
        )
    }
}

export default DashboardContent;
