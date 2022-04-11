import React from "react";
import { Link } from "react-router-dom";
import '../styles/General.scss';

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to = ""> My Files </Link>   
                    </li>
                    <li>
                        <Link to = ""> Dashboards </Link>
                    </li>
    
                </ul>
            </div>
            
        )
    }
}