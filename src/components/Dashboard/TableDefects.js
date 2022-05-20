import {React, Component} from 'react';
import { Tabs } from '@douyinfe/semi-ui';

class TableDefects extends Component {
    constructor() {
        super();
        this.state = { key: '1' };
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(key, type) {
        this.setState({ [type]: key });
    }

    render() {
        // eslint-disable-next-line react/jsx-key
        const contentList = [<div>Document</div>, <div>Quick Start</div>, <div>Help</div>];
        const tabList = [
            { tab: 'Document', itemKey: '1' },
            { tab: 'Quick Start', itemKey: '2' },
            { tab: 'Help', itemKey: '3' },
        ];
        return (
            <Tabs
                type="button"
                tabList={tabList}
                onChange={key => {
                    this.onTabClick(key, 'key');
                }}
            >
                {contentList[this.state.key - 1]}
            </Tabs>
        );
    }
}
export default TableDefects
