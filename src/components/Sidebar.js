import { React, Component } from "react";
import { Layout, Nav} from '@douyinfe/semi-ui';
import { Link } from "react-router-dom";
import { GoFileDirectory } from "react-icons/go";
import { MdDashboard } from "react-icons/md";

import '../styles/Sidebar.scss'

export default class Sidebar extends Component {
    render() {
        const Sider = Layout;

        return (
            // TODO: Improve on click routing to other pages of the site
            <Sider >
                <Nav
                    className='sidebars'
                    defaultSelectedKeys={['Home']}
                    items={[
                        { itemKey: 'Home', text: <span className='label'>My Files</span>, icon: <Link to = "/myfiles"> <GoFileDirectory className="sidebar-icon"/> </Link>},
                        { itemKey: 'Histogram', text: <span className='label'>Dashboard</span>, icon: <Link to="/dashboard"> <MdDashboard className="sidebar-icon" /> </Link>}
                    ]}
                    footer={{
                        className: 'footer',
                        collapseButton: true,
                    }}
                >
                </ Nav>
            </Sider>
        )
    }
}