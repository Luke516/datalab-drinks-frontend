import React, { useEffect, useState } from "react";
import DrinkList from "../components/DrinkList";
import DrinkCell from "../components/DrinkList";
import { getMenu } from "../services/api";
import "./DrinkSection.css"

export default function DrinkSection(props) {

    return(
        <div className="my-4" style={{position: "relative"}}>
            <div className="row card drink-section p-2">
                <h1 className="mt-2">{props.series.series}</h1>
                <DrinkList data={props.series.items}/>
            </div>
        </div>
    )
}