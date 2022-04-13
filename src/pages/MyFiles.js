import React from "react";
import '../styles/MyFiles.scss'

import {Container} from 'react-bootstrap';

import BoxFiles from "../components/BoxFiles";
import Navbuttons from "../components/Navbuttons";

class MyFile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Container className="myFiles">
                    <h1 className="headTitle">MY FILES</h1>
                    <div className="BoxContainer">
                        <BoxFiles/>
                    </div>
                </Container>
                <Navbuttons/>

                {/*<div className="myFiles">

                <span>
                    Hola Charlie!
                </span>

                <br />

                <span>

                    {this.props.test}
                </span>

            </div>*/}
            </>
            
            
        )
    }
}

export default MyFile;