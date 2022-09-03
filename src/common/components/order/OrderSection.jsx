import React, { useEffect, useState } from "react";
import DrinkList from "./DrinkList";

export default function OrderSection(props) {

    return(
        <div className="my-4" style={{position: "relative"}}>
            <div className="card drink-section p-3" style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}>
                <h1 className="mt-2">{props.series.series}</h1>
                <DrinkList data={props.series.items}/>
            </div>
        </div>
    )
}