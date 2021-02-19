import React, { useState, useContext } from "react";
import { AppContext } from "../App";

export default function OrderSummary(props) {
    const [showModal, setShowModal] = useState(false);

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    return(
        <div className="row mt-4">
            <h1>統計</h1>
            {props.data.map((item, key) => {
                return (<div key={key} className="col-lg-3 col-sm-6">
                    {`${item.item}(${item.size === "large"? "大": "中"}) /${item.sugar_tag}/${item.ice_tag}`} x {item.number}
                </div>)
            })}
        </div>
    )
}