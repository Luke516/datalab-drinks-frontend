import React, { useState } from "react";
import OrderModal from "./OrderModal";
import './DrinkCell.css';

export default function DrinkCell(props) {
    const [showModal, setShowModal] = useState(false);
    return(
        <li className="list-group-item d-flex flex-row justify-content-between" onClick={()=>{if(!showModal)setShowModal(true)}}>
            {props.data.item}
            <div className="d-flex">
                <div className="mx-1" style={{visibility: props.data.medium_price === 0? "hidden": "visible"}}>
                    <span className="mx-1 badge rounded-pill bg-primary">M</span>
                    <span className="mx-1">{props.data.medium_price}</span>
                </div>
                <div className="mx-1" style={{visibility: props.data.large_price === 0? "hidden": "visible"}}>
                    <span className="mx-1 badge rounded-pill bg-primary">L</span>
                    <span className="mx-1">{props.data.large_price}</span>
                </div>
            </div>
            {showModal && 
                <OrderModal data={props.data} setShowModal={setShowModal}/>
            }
        </li>
    )
}