import React, { useState, useContext } from "react";
import { useAppContext } from "../../contexts/AppContext";

export default function OrderCell(props) {
    const appContext = useAppContext();
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    return(
        <li className="list-group-item d-flex flex-column drink-section p-0 bg-transparent">
            <div className="btn p-2">
                <div className="d-flex flex-row  justify-content-between">
            <span>{`${props.data.item}(${props.data.size == "large"? "大": "中"})/${props.data.ice_tag}/${props.data.sugar_tag}`}</span>
            <span>{props.data.order_by}</span>
            {/* <div className="d-flex"> TODO?
                {Object.keys(props.data.prices).map((k) => {
                    return <div key={k} className="mx-1" style={{visibility: props.data.prices[k] === 0? "hidden": "visible"}}>
                            <span className="mx-1 badge rounded-pill bg-primary">{k}</span>
                            <span className="mx-1">{props.data.prices[k]}</span>
                        </div>
                })}
            </div> */}
            </div>
            </div>
        </li>
    )
}