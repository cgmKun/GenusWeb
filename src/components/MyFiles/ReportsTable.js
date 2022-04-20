import { React, Component } from "react";
import { Table } from '@douyinfe/semi-ui';

class ReportsTable extends Component { 
    render() {
        const columns = [
            {
                title: 'Record Name',
                dataIndex: 'recordTitle',
                render: (text) => {
                    return (
                        <div>{text}</div>
                    );
                }
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
            },
            {
                title: 'Uploaded',
                dataIndex: 'dateUploaded',
                render: (text) => {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }
    
            },
            {
                title: 'Last Modified',
                dataIndex: 'lastModifiedDate',
            }
        ];
        const data = [
            {
                key: '1',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Carlos Mora',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '2',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Carlos Mora',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '3',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Carlos Mora',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '4',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Aylin Camacho',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '5',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Aylin Camacho',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '6',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Aylin Camacho',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '7',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Valeria Conde',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '8',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Rodrigo Montelongo',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
            {
                key: '9',
                recordTitle: 'Reporte de 20 de Junio',
                owner: 'Santiago Arias',
                dateUploaded: '28/06/2021',
                lastModifiedDate: '18/12/2021'
            },
        ];

        return <Table className='report-table' columns={columns} dataSource={data} pagination={{pageSize: 5}} />;
    }
}

export default ReportsTable
