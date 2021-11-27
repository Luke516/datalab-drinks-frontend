import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import './NavBar.css'
import faunaLogo from '../images/fauna.png'

export default function NavBar(props) {
    let location = useLocation();
    let path = location.pathname.split("/");

    return(
        <nav className="navbar navbar-light navbar-expand-md px-1 py-0" id="nav-bar" role="tablist">
            <div id="datalab-drink-logo-background" className="navbar-brand py-2">
                <div id="datalab-drink-logo">
                    <img src={faunaLogo} style={{height: "2rem"}}></img>
                </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3" + (path[1] == "participants"? " selected" : "")}>
                            <Link className="nav-link" to={`/participants`}>
                                全部名單
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "groups"? " selected" : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                分組名單
                            </Link>
                        </div>
                    </li>
                    {/* <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                個人專注組
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                配對專注組
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                個人挑戰組
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                團體挑戰組
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                資料庫功能
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " " : "")}>
                            <Link className="nav-link" to={`/groups`}>
                                事件
                            </Link>
                        </div>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}