import { React, Component } from "react";
import { Typography, Row, Col } from '@douyinfe/semi-ui';

import ReportsTable from "../components/MyFiles/ReportsTable";
import SubmitReport from "../components/Actions/SubmitReport";

import '../styles/MyFiles.scss';

class MyFile extends Component {
    render() {
        const { Title } = Typography

        return (
            <div className='my-files-content'>
                <Row>
                    <Col md={22} > <Title className="my-files-title">My Files</Title> </Col>
                    <Col md={2} > <SubmitReport /> </Col>
                </Row>
                <ReportsTable />
            </div>
        )
    }
}

export default MyFile;
