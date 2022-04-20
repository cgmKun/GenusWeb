import { React, Component } from "react";
import { Typography } from '@douyinfe/semi-ui';

import ReportsTable from "../components/MyFiles/ReportsTable";
import ActionButtons from "../components/MyFiles/ActionButtons";
import '../styles/MyFiles.scss'

class MyFile extends Component {
    render() {
        const { Title } = Typography

        return (
            <div className='my-files-content'>
                <Title className="my-files-title">My Files</Title>
                <ReportsTable />
                <ActionButtons />
            </div>
        )
    }
}

export default MyFile;
