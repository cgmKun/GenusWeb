import React from "react";
import { Link } from "react-router-dom";
import '../styles/General.scss';
import { GoFileDirectory } from "react-icons/go";
import { MdDashboard } from "react-icons/md";

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to = ""> <GoFileDirectory className="icon"/> </Link>   
                    </li>
                    <li>
                        <Link to=""> <MdDashboard className="icon" /> </Link>   
                    </li>
    
                </ul>
            </div>
            
        )
    }
}