import React from "react";
import Barnav from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import '../styles/General.scss';
import logo from '../images/logo-cemex.png';

export default class Navbar extends React.Component {
    render() {
        return (
            <>
                <Barnav bg="light">
                    <Container>
                        <Barnav.Brand href="#home"> <img src={logo} className='logo' /> </Barnav.Brand>
                    </Container>
                </Barnav>
               
            </>
        )
    }
}