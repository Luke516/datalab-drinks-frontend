import React, { useEffect, useState } from "react";
import DrinkSection from "../components/DrinkSection";
import DrinkList from "../components/DrinkSection";
import { getMenu } from "../services/api";
import { Tab } from 'bootstrap';
import { useLocation, useParams } from "react-router-dom";

export default function AllDrinks(props) {
    const [drinkData, setDrinkData] = useState(null);
    const [activePaneId, setActivePaneId] = useState(0);
    let location = useLocation();
    let param = useParams();

    return(
        <>
            <div className="container tab-content" id="nav-tabContent">
            {props.drinkData && props.drinkData.menu &&
                props.drinkData.menu.map((series, key) => {
                    return (
                        (param.series == key || param.series == "all")?
                        <div key={key} className={"tab-panefadeactiveshow"} id={"drink" + key} role="tabpanel" aria-labelledby={`drink-${key}-tab`}>
                            <DrinkSection series={series} />
                        </div>:
                        <></>
                    )
                })
            }
            </div>
        </>
    )
}