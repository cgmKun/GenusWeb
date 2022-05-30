import { React, Component } from "react";
import { Space } from '@douyinfe/semi-ui';

import SubmitReportButton from './SubmitReportButton.js';


class ActionButtons extends Component {
    render() {

        return (
            <Space>
                <SubmitReportButton />
            </Space>
        )
    }
}

export default ActionButtons
