import { React, Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
import '../../styles/Dashboard.scss'

class Graph2 extends Component {
    state = {
        groups: []
    }

    componentDidMount() {
        this.fetchReports();
    }

    fetchReports() {
        const request = {
            query: `
            query {
                groups{
                    groupTitle
                    defects{
                        _id
                    }
                }
            }
        `
        }

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
            const groups = resData.data.groups; //Json ya formateado
            this.setState({ groups: groups });
        }).catch(err => {
            console.log(err);
        });
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

    render() {

        const groups = this.state.groups; //
        const labels_aux = [];
        const data_aux = [];
        groups.forEach(group => {
            labels_aux.push(group.groupTitle)
            data_aux.push(group.defects.length)
        })
        const data = {
            labels: labels_aux,
            datasets: [
                {
                    label: '# of Groups',
                    data: data_aux,
                    backgroundColor: [
                        'rgb(226, 215, 97)',
                        'rgb(103, 148, 220)',
                        'rgb(163, 103, 220)',
                        'rgb(159, 230, 93)',
                        'rgb(222, 139, 101)',
                        'rgb(140, 85, 224)',
                        'rgb(201, 81, 68)'
                    ],
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
}

export default Graph2
