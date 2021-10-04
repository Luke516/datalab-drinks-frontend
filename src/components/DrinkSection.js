import React, { useEffect, useState } from "react";
import DrinkList from "../components/DrinkList";
import DrinkCell from "../components/DrinkList";
import { getMenu } from "../services/api";

export default function DrinkSection(props) {

    return(
        <div className="my-4">
            <h1>{props.series.series}</h1>
            <div className="row">
                <DrinkList data={props.series.items}/>
            </div>
        </div>
    )
}