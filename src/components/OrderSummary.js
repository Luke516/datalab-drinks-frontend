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
                return (<div key={key} className="col-lg-4 col-md-6 p-2">
                    <div className="d-flex rounded border border-primary m-1 w-100 h-100">
                        <div className="flex-grow-1 p-2">
                            <span>{`${item.item}(${item.size === "large"? "大": "中"})/${item.sugar_tag}/${item.ice_tag}`}</span>
                        </div>
                        <div className="h-100 border-start border-primary p-2">
                            <span>{item.number}</span>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    )
}