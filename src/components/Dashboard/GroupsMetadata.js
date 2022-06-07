import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from '@douyinfe/semi-ui';
import {IconAlertTriangle, IconHistogram, IconCalendar} from '@douyinfe/semi-icons';

import { fetchGroupsByReportAndSessionId } from "../../graphql/fields";

class GroupsMetadata extends Component {
    static propTypes = {
        reportId: PropTypes.any,
        sessionId: PropTypes.any
    }

    constructor() {
        super();
    
        this.state = {
            groups: []
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
            this.setState({ groups: group });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.fetchGroupsByReportAndSessionId();
    }

    render() {
        const groups = this.state.groups;


        if(!groups) {
            return;
        }

        console.log(groups)

        return (
            <Card className='cardMData' >
                <Col className='eleCard' style={{ marginBottom: '20px' }} >
                    <IconHistogram className='iMData' size="extra-large" style={{ color: '#de8b65' }} />
                    <div className='titleMData' > Total Groups </div> 
                    <div className='desMData' > {`${groups.length}`} </div> 
                </Col>
                <Col className='eleCard' style={{ marginBottom: '20px' }} >
                    <IconAlertTriangle className='iMData' size="extra-large" style={{ color: '#c62b52' }} />
                    <div className='titleMData' > Total Defects </div>
                    <div className='desMData' > {`${this.getTotalDefects(groups)}`} </div>
                </Col>
                <Col className='eleCard' >
                    <IconCalendar className='iMData' size="extra-large" style={{ color: '#9fe65d' }} />
                    <div className='titleMData' > Creation Date </div>
                    <div className='desMData' > {`${this.getSubmitDate(groups)}`} </div>
                </Col>
            </Card>
        )
    }

    getTotalDefects(groups) {
        let totalDefects = 0;

        groups.forEach(group => {
            totalDefects = totalDefects + group.defects.length
        })

        return totalDefects;
    }

    getSubmitDate(groups) {
        let date = "";

        groups.forEach(group => {
            date = group.submitDate
            return;
        })

        return date
    }

    getGroupsKeywords(groups) {
        const items = []

        groups.forEach(group => {
            items.push(<h2>{group.groupTitle}</h2>)

            group.keywords.forEach(keyword => {
                items.push(<p>{keyword}</p>)
            })
        })

        return items
    }
}

export default GroupsMetadata;
