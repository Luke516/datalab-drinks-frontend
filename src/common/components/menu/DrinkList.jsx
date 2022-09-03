import React, { useEffect, useState } from "react";
import DrinkCell from "./DrinkCell";

export default function DrinkList(props) {

    return(
        <div className="d-flex flex-column">
            <ul className="accordion accordion-flush list-group list-group-flush p-0 m-0">
                {props.data.map((item, key) => {
                    item.item = item.item.replace(" ", "");
                    return (<DrinkCell key={key} data={item}/>)
                })}
            </ul>
        </div>
    )
}