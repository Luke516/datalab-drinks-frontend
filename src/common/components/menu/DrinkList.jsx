import React, { useEffect, useState } from "react";
import DrinkCell from "./DrinkCell";

export default function DrinkList(props) {

    return(
        <div className="row">
            <ul className="accordion accordion-flush list-group-flush">
                {props.data.map((item, key) => {
                    item.item = item.item.replace(" ", "");
                    return (<DrinkCell key={key} data={item}/>)
                })}
            </ul>
        </div>
    )
}