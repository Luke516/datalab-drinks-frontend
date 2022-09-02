import Image from "next/image";
import React from "react";
// TODO
// import { Link, useLocation, useParams } from "react-router-dom";
// import dataLabLogo from '../images/datalab-logo-white.png'
// import logoBgImg from '../images/datalab-bg.jpg';

import dataLabLogo from "../../../../public/images/datalab-logo-white.png";
import { useAppContext } from "../../contexts/AppContext";
import styles from "./NavBar.module.css";
import NavBarItem from "./NavBarItem";

export default function NavBar(props) {
    // let location = useLocation();
    // let path = location.pathname.split("/");

    const { drinkData } = useAppContext();

    return(
        <nav id={styles["nav-bar"]} className="navbar navbar-light navbar-expand-md px-1 py-0" role="tablist">
            <div id={styles["datalab-drink-logo-background"]} className={"navbar-brand py-2 " + styles["nav-logo-background"]}>
                <div id={styles["datalab-drink-logo"]}>
                    <Image src={dataLabLogo} height="46" width="176" objectFit="contain" />
                </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavBarItem item="All drinks" link="/drinks/all"/>
                    {drinkData && drinkData.menu &&
                        drinkData.menu.map((series, key) => {
                            return (
                                <NavBarItem key={key} item={series.series} link={`/drinks/${key}`}/>
                                // <li key={key} className="nav-item">
                                //     <div className={"nav-link-background mx-lg-0 mx-sm-3 " + (path[2] == key? " selected" : "")}>
                                //         <Link className={"nav-link"} to={`/drinks/${key}`}>
                                //             {series.series}
                                //         </Link>
                                //     </div>
                                // </li>
                            )
                        })
                    }
                    <NavBarItem item="Orders" link="/orders"/>
                    {/* TODO <li className="nav-item">
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
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}