import React, { useState } from "react";
import OrderModal from "./OrderModal";
import './DrinkCell.css';
import OrderCollpase from "./OrderCollapse";

export default function DrinkCell(props) {
    const [showModal, setShowModal] = useState(false);
    return(
        <li className="list-group-item d-flex flex-column p-0" onClick={()=>{if(!showModal)setShowModal(true)}}>
            <button className="btn p-2" type="button" data-bs-toggle="collapse" data-bs-target={`#${props.data.item}`} aria-expanded="false" aria-controls={props.data.item}>
            <div className="d-flex flex-row justify-content-between">
                <span>{props.data.item}</span>
                <div className="d-flex">
                    <div className="mx-1 drink-price" style={{visibility: props.data.medium_price === 0? "hidden": "visible"}}>
                        <span className="mx-1 badge rounded-pill bg-primary">M</span>
                        <span className="mx-1">{props.data.medium_price}</span>
                    </div>
                    <div className="mx-1 drink-price" style={{visibility: props.data.large_price === 0? "hidden": "visible"}}>
                        <span className="mx-1 badge rounded-pill bg-primary">L</span>
                        <span className="mx-1">{props.data.large_price}</span>
                    </div>
                </div>
            </div>
            </button>
            {/* {showModal && 
                <OrderModal data={props.data} setShowModal={setShowModal}/>
            } */}
            <OrderCollpase data={props.data} />
        </li>
    )
}