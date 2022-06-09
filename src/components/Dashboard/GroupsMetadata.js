import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from '@douyinfe/semi-ui';
import {IconAlertTriangle, IconHistogram, IconCalendar} from '@douyinfe/semi-icons';

class GroupsMetadata extends Component {
    static propTypes = {
        groups: PropTypes.any
    }

    render() {
        const groups = this.props.groups;
        const { Meta } = Card;

        if(!groups) {
            return;
        }

        return (
            <Row className='cards-container' gutter={32} >
                <Col span={8} >
                    <Card>
                        <Meta
                            title={<p className='tCardMData'> Total Groups </p>}
                            description={<p className='dCardMData'> {`${groups.length}`} </p>}
                            avatar={
                                <IconHistogram className='iMData' size="extra-large" style={{ color: '#de8b65', fontSize: '35px' }} />
                            }
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Meta
                            title={<p className='tCardMData'> Total Defects </p>}
                            description={<p className='dCardMData'> {`${this.getTotalDefects(groups)}`} </p>}
                            avatar={
                                <IconAlertTriangle className='iMData' size="extra-large" style={{ color: '#c62b52', fontSize: '35px' }} />
                            }
                        />
                    </Card>
                </Col> 
                <Col span={8}>
                    <Card>
                        <Meta
                            title={<p className='tCardMData'> Creation Date </p>}
                            description={<p className='dCardMData'> {`${this.getSubmitDate(groups)}`} </p>}
                            avatar={
                                <IconCalendar className='iMData' size="extra-large" style={{ color: '#9fe65d', fontSize: '35px' }} />
                            }
                        />
                    </Card>
                </Col>    
            </Row>

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
