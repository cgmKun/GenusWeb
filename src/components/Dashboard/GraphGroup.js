import { React, Component } from "react";
import PropTypes from 'prop-types';
import { Card, Switch } from '@douyinfe/semi-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from 'react-chartjs-2';

import '../../styles/Dashboard.scss'


class GraphGroup extends Component {
    static propTypes = {
        groups: PropTypes.any
    }

    constructor() {
        super();
    
        this.state = {
            display: false,
        };
    }

    render() {
        const groups = this.props.groups;
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
            ],
        }

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: this.state.display,
                    position: 'bottom',
                },
            },
        };

        return (
            <div className='chart' >
                <Card
                    title='Cluster Found'
                    headerExtraContent={
                        <Switch onChange={(v) => this.setState({display: v})} ></Switch>
                    }
                >
                    <Doughnut options={options} data={data} />
                </Card>
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
