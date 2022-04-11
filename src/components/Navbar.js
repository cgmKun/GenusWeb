import React from "react";
import Barnav from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import '../styles/General.scss';

export default class Navbar extends React.Component {
    render() {
        return (
            <>
                <Barnav bg="light">
                    <Container>
                        <Barnav.Brand href="#home">NavBark</Barnav.Brand>
                    </Container>
                </Barnav>
               
            </>
        )
    }
}