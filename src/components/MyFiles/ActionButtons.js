import { React, Component } from "react";
import { Button, Toast, Space } from '@douyinfe/semi-ui';

class ActionButtons extends Component {
    render() {
        const onUpload = {
            content: 'File Uploaded Successfully',
            duration: 3,
        };

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
                <Button onClick={() => Toast.success(onUpload)}>UPLOAD FILE</Button>
                <Button onClick={() => Toast.success(onRemove)}>REMOVE FILE</Button>
                <Button onClick={() => Toast.success(onGroup)}>START GROUPING</Button>
            </Space>
        )
    }
}

export default ActionButtons
