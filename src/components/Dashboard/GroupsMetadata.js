import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from '@douyinfe/semi-ui';
import {IconAlertTriangle, IconHistogram, IconCalendar} from '@douyinfe/semi-icons';

class GroupsMetadata extends Component {
    static propTypes = {
        groups: PropTypes.any
    }

    render() {
        const groups = this.props.groups;

        if(!groups) {
            return;
        }

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
