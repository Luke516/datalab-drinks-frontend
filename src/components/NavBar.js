import React from "react";
import { Link } from "react-router-dom";
import dataLabLogo from '../images/datalab-logo-plain.png'

export default function NavBar(props) {
    return(
        <div className="nav nav-pills p-2" id="nav-bar" role="tablist">
            <img src={dataLabLogo} style={{height: "2.5rem"}}></img>
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
        </div>
    )
}