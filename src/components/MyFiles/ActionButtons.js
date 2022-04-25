import { React, Component } from "react";
import { Button, Toast, Space } from '@douyinfe/semi-ui';

import SubmitReportButton from './SubmitReportButton.js';

class ActionButtons extends Component {
    render() {
        const onRemove = {
            content: 'File Removed Successfully',
            duration: 3,
        };

        const onGroup = {
            content: 'Grouping Successfully Started',
            duration: 3,
        };

        return (
            <Space>
                <SubmitReportButton />
                <Button onClick={() => Toast.success(onRemove)}>REMOVE FILE</Button>
                <Button onClick={() => Toast.success(onGroup)}>START GROUPING</Button>
            </Space>
        )
    }
}

export default ActionButtons
