import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import './NavBar.css'
import dataLabLogo from '../images/datalab-logo-white.png'
import logoBgImg from '../images/datalab-bg.jpg';

export default function NavBar(props) {
    let location = useLocation();
    let path = location.pathname.split("/");

    return(
        <div className="nav nav-pills p-2" id="nav-bar" role="tablist">
            <div id="datalab-drink-logo-background" style={{backgroundImage: `url(${logoBgImg})`}}>
                <div id="datalab-drink-logo">
                    <img src={dataLabLogo} style={{height: "2.5rem"}}></img>
                </div>
            </div>
            <div className={"nav-link-background " + (path[2] == "all"? " selected" : "")}>
                <Link className="nav-link" to={`/drinks/all`}>
                    全部飲料
                </Link>
            </div>
            {props.drinkData && props.drinkData.menu &&
                props.drinkData.menu.map((series, key) => {
                    return (
                        <div key={key} className={"nav-link-background" + (path[2] == key? " selected" : "")}>
                            <Link className={"nav-link"} to={`/drinks/${key}`}>
                                {series.series}
                            </Link>
                        </div>
                    )
                })
            }
            <div className={"nav-link-background " + (path[1] == "orders"? " selected" : "")}>
                <Link className="nav-link" to={`/orders`}>
                    訂購紀錄
                </Link>
            </div>
        </div>
    )
}