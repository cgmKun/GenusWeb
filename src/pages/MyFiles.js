import React from "react";
//import '../styles/General.scss'
import '../styles/MyFiles.scss'

import {Container} from 'react-bootstrap';
//import SideBar from "../components/Sidebar";

class MyFile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Container className="myFiles">
                    <h1>My files</h1>
                </Container>

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