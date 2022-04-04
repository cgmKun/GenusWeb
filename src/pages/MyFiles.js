import React from "react";

//import SideBar from "../components/Sidebar";

class MyFile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <span>
                    Hola Charlie!
                </span>

                <br />

                <span>
                    {/* eslint-disable-next-line react/prop-types */}
                    {this.props.test}
                </span>

            </div>
        )
    }
}

export default MyFile;