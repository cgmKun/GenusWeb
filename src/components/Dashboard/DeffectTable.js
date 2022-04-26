import React from 'react';
import { List} from '@douyinfe/semi-ui';

class DeffecTable extends React.Component {
    render() {
        const data = [
            {
                name: 'Issue',
                descripcion: 
                <p
                    style={{
                        color: 'var(--semi-color-text-2)',
                        margin: '4px 0',
                        //width: 420,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {`DCM021CX0118-23971`}
                </p>
            },
            {
                name: 'Summary',
                descripcion:
                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0'}}>
                    QA - DE ReadyMix go Order Details screen showing blank screen
                </p>
            },
            {
                name: 'Description',
                descripcion:
                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0'}}>
                    {`QA - DE ReadyMix go Order Details screen showing blank screen_x000D_\n_x000D_\n*Data*_x000D_\nBauer@mailinator.com_x000D_\nCemex!2020_x000D_\n_x000D_\n*Steps*_x000D_\nLogin to Readymix go app using the above credentials (or any QA credentials)_x000D_\nselect the jobsite or all the jobsites_x000D_\nGo to any order with any status_x000D_\nOrder details screen will be blank_x000D_\n_x000D_\n*Expected Behaviour*_x000D_\nThe Order Details screen should show order specs._x000D_\n_x000D_\n !image-2021-12-27-13-35-35-519.png|thumbnail!`}
                </p>
            }
        ];

        return (
            <div style={{ padding: 12, border: '1px solid var(--semi-color-border)', margin: 12 }}>
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</span>
                                    {item.descripcion}
                                </div>
                            }
                            
                        />
                    )}
                />
            </div>
        );
    }
}


export default DeffecTable
