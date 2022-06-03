import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from '@douyinfe/semi-ui';
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

        const data = [
            {
                key: '',
                value: (
                    <span>
                        <IconHistogram className='iMData' size="extra-large" style={{ color: '#de8b65'}} />
                    </span>
                )
            },
            { 
                key: 'Total Groups', 
                value: (
                    <span className='tMData'>
                        {`${groups.length}`}
                    </span>
                ) 
            },
            {
                key: '',
                value: (
                    <span>
                        <IconAlertTriangle className='iMData' size="extra-large" style={{ color: '#c62b52' }}/>
                    </span>
                )
            },
            { 
                key: 'Total Defects', 
                value: (
                    <span className='tMData'>
                        {`${this.getTotalDefects(groups)}`}
                    </span>
                )
            },
            {
                key: '',
                value: (
                    <span>
                        <IconCalendar className='iMData' size="extra-large" style={{ color: '#9fe65d' }} />
                    </span>
                )
            },
            { 
                key: 'Creation Date', 
                value: (
                    <span className='tMData'>
                        {`${this.getSubmitDate(groups)}`}
                    </span>
                )
            },
        ]; 

        const style = {
            boxShadow: 'var(--semi-shadow-elevated)',
            backgroundColor: 'var(--semi-color-bg-2)',
            borderRadius: '4px',
            padding: '10px',
            marginRight: '20px',
        };

        return (
            <div>
                <Descriptions data={data} row size="small" style={style} />
            </div>
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
