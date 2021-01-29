import React, { useEffect, useState } from "react";
import DrinkSection from "../components/DrinkSection";
import DrinkList from "../components/DrinkSection";
import { getMenu } from "../services/api";

export default function AllDrinks(props) {
    const [drinkData, setDrinkData] = useState(null);

    useEffect(() => {
        let mounted = true;
        getMenu()
        .then(items => {
            setDrinkData(items);
            // if(mounted) {
            //   setList(items)
            // }
        })
        return () => mounted = false;
    }, [])

    return(
        <div className="row">
        {drinkData && drinkData.menu &&
            drinkData.menu.map((series, key) => {
                return <DrinkSection key={key} series={series} />
            })
        }
        </div>
    )
}