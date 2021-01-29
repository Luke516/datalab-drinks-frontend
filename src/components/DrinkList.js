import React, { useEffect, useState } from "react";
import DrinkCell from "../components/DrinkCell";
import { getMenu } from "../services/api";

export default function DrinkList(props) {

    return(
        <div className="row">
            {props.data.map((item, key) => {
                return (<DrinkCell key={key} data={item}/>)
            })}
        </div>
    )
}