import React from "react";


import '../styles/MyFiles.scss';

export default class Navbuttons extends React.Component {
    render() {
        return (
            <div className="navbuttons">
                <button className="UploadButton">UPLOAD FILE</button>
                <button className="RemoveButton">REMOVE FILE</button>
                <button className="StartButton">START PROCESS</button>
            </div>
        )
    }
}