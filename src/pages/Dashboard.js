import { React, Component } from "react";
import { Row, Col } from '@douyinfe/semi-ui';

//import DeffectModal from "../components/Dashboard/DeffectModal";
import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
import GraphGroup from "../components/Dashboard/GraphGroup";

import "../styles/Dashboard.scss"

class Dashboard extends Component {
    render () {
        return(
            <div className="container">
                
                <Row>
                    <Col md={9}>
                        <GraphGroup/>
                    </Col>
                    <Col md={15}>
                        <DefectsOnGroup/>
                    </Col>
                    
                </Row>
            </div>
        )
    }
}

export default Dashboard