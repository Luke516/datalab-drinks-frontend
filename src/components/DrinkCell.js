import React, { useState } from "react";
import OrderModal from "./OrderModal";
import './DrinkCell.css';

export default function DrinkCell(props) {
    const [showModal, setShowModal] = useState(false);
    return(
        <li className="list-group-item" onClick={()=>{if(!showModal)setShowModal(true)}}>
            {props.data.item}
            {showModal && 
                <OrderModal data={props.data} setShowModal={setShowModal}/>
            }
        </li>
    )
}