import { React, Component } from "react";
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { fetchGroupsByReportAndSessionId } from "../../graphql/fields";
ChartJS.register(ArcElement, Tooltip, Legend);
import '../../styles/Dashboard.scss'

class GraphGroup extends Component {
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
        const groupsTitle = [];
        const groupDefectCount = [];

        groups.forEach(group => {
            groupsTitle.push(group.groupTitle)
            groupDefectCount.push(group.defects.length)
        })

        const data = {
            labels: groupsTitle,
            datasets: [
                {
                    label: '# of Groups',
                    data: groupDefectCount,
                    backgroundColor: this.getRandomColors(groupsTitle.length),
                    hoverOffset: 4
                }
            ]
        }

        return (
            <div className='chart' >
                <Doughnut data={data} />
            </div>
        );
    }

    tableColumns() {
        return [
            {
                title: 'Group',
                dataIndex: 'groupTitle',
                render: (text) => {
                    return (
                        <div>{text}</div>
                    );
                }
            },
        ];
    }

    getRandomColors(groupCount) {
        const backgroundColors = [];

        for(let i = 0; i<groupCount; i++) {
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(50, 255);
            const g = randomBetween(50, 255);
            const b = randomBetween(50, 255);
            const rgb = `rgb(${r},${g},${b})`;
            backgroundColors.push(rgb)
        }

        return backgroundColors;
    }
}

export default GraphGroup;
