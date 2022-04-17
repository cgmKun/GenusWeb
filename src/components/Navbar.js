import { React, Component } from "react";
import { Nav } from '@douyinfe/semi-ui';
import logo from '../images/logo-cemex.png';

import '../styles/Navbar.scss'

export default class Navbar extends Component {
    render() {
        // TODO: Add onclick to the cemex logo
        return (
            <div >
                <Nav className='navbar' mode='horizontal' >
                    <Nav.Header>
                        <img src={logo} className='logo' />
                    </Nav.Header>
                </Nav>
            </div>
        )
    }
}