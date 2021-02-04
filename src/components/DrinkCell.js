import React, { useState } from "react";
import OrderModal from "./OrderModal";
import './DrinkCell.css';

export default function DrinkCell(props) {
    const [showModal, setShowModal] = useState(false);
    return(
        <li className="list-group-item d-flex flex-row justify-content-between" onClick={()=>{if(!showModal)setShowModal(true)}}>
            {props.data.item}
            <div className="d-flex">
                {Object.keys(props.data.prices).map((k) => {
                    return <div key={k} className="mx-1" style={{visibility: props.data.prices[k] === 0? "hidden": "visible"}}>
                            <span className="mx-1 badge rounded-pill bg-primary">{k}</span>
                            <span className="mx-1">{props.data.prices[k]}</span>
                        </div>
                })}
            </div>
            {showModal && 
                <OrderModal data={props.data} setShowModal={setShowModal}/>
            }
        </li>
    )
}