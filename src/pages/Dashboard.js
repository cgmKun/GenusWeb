import { React, Component } from "react";

//import DeffectModal from "../components/Dashboard/DeffectModal";
import DefectsOnGroup from "../components/Dashboard/DefectsOnGroup";
import GroupCards from "../components/Dashboard/GroupCards";
//import DeffectTable from "../components/Dashboard/DeffectTable";
//import { Empty } from '@douyinfe/semi-ui';
//import underConstruction from '../images/istockphoto-1273109788-612x612.jpeg';

import "../styles/Dashboard.scss"

class Dashboard extends Component {
    render () {
        return(
            <div className="container">
                <GroupCards/>
                <DefectsOnGroup/>
            </div>
        )
    }
}

export default Dashboard