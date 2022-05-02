import { React, Component } from "react";
import Container from 'react-bootstrap/Container'

//import DeffectModal from "../components/Dashboard/DeffectModal";
import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
import GroupCards from "../components/Dashboard/GroupCards";
import GraphGroup from "../components/Dashboard/GraphGroup";

import "../styles/Dashboard.scss"

class Dashboard extends Component {
    render () {
        return(
            <Container fluid className="container">
                <div className="chart-area" >
                    <GraphGroup/>
                    <GroupCards/>
                </div>
                <DefectsOnGroup/>
            </Container>
        )
    }
}

export default Dashboard