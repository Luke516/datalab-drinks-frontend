import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import dataLabLogo from '../images/datalab-logo-plain.png'
import logoBgImg from '../images/datalab-bg.jpg';

export default function NavBar(props) {
    return(
        <div className="nav nav-pills p-2" id="nav-bar" role="tablist">
            <div id="datalab-drink-logo-background" style={{backgroundImage: `url(${logoBgImg})`}}>
                <div id="datalab-drink-logo">
                    <img src={dataLabLogo} style={{height: "2.5rem"}}></img>
                </div>
            </div>
            <Link key={"all"} className="nav-link" to={`/drinks/all`}>
                全部飲料
            </Link>
            {props.drinkData && props.drinkData.menu &&
                props.drinkData.menu.map((series, key) => {
                    return (
                        <Link key={key} className="nav-link" to={`/drinks/${key}`}>
                            {series.series}
                        </Link>
                    )
                })
            }
            <Link key={"orders"} className="nav-link" to={`/orders`}>
                訂購紀錄
            </Link>
        </div>
    )
}