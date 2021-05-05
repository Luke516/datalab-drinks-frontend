import React, { useState, useContext } from "react";
import { AppContext } from "../App";

export default function OrderTreeCell(props) {
    const [showModal, setShowModal] = useState(false);

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    return(
        <li className="list-group-item d-flex flex-row justify-content-between" onClick={()=>{if(!showModal)setShowModal(true)}}>
            <span>{`${props.data.item}`}</span>
            <span>{props.data.order_by}</span>
            {/* <div className="d-flex">
                {Object.keys(props.data.prices).map((k) => {
                    return <div key={k} className="mx-1" style={{visibility: props.data.prices[k] === 0? "hidden": "visible"}}>
                            <span className="mx-1 badge rounded-pill bg-primary">{k}</span>
                            <span className="mx-1">{props.data.prices[k]}</span>
                        </div>
                })}
            </div> */}
        </li>
    )
}