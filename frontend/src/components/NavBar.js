import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import dataLabLogo from '../images/datalab-logo-white.png'
import logoBgImg from '../images/datalab-bg.jpg';

export default function NavBar(props) {
    let location = useLocation();
    let path = location.pathname.split("/");

    return(
        <nav className="navbar navbar-light navbar-expand-md px-1 py-0" id="nav-bar" role="tablist">
            <div id="datalab-drink-logo-background" className="navbar-brand py-2" style={{backgroundImage: `url(${logoBgImg})`}}>
                <div id="datalab-drink-logo">
                    <img src={dataLabLogo} style={{height: "2.5rem"}}></img>
                </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3" + (path[2] == "all"? " selected" : "")}>
                            <Link className="nav-link" to={`/drinks/all`}>
                                全部飲料
                            </Link>
                        </div>
                    </li>
                    {props.drinkData && props.drinkData.menu &&
                        props.drinkData.menu.map((series, key) => {
                            return (
                                <li key={key} className="nav-item">
                                    <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[2] == key? " selected" : "")}>
                                        <Link className={"nav-link"} to={`/drinks/${key}`}>
                                            {series.series}
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <li className="nav-item">
                        <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[1] == "orders"? " selected" : "")}>
                            <Link className="nav-link" to={`/orders`}>
                                訂購紀錄
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}