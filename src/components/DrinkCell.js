import React, { useState } from "react";
import './DrinkCell.css';

export default function DrinkCell(props) {
    const [showModal, setShowModal] = useState(false);
    return(
        <li className="list-group-item" onClick={()=>{if(!showModal)setShowModal(true)}}>
            {props.data.item}
            {showModal && 
            <div className="full-window popup-background" style={{position: "fixed", display: "block", backgroundColor: "rgba(0,0,0,0.25)"}}>
                <div className="modal" style={{position: "fixed", display: "block"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{"訂購一杯"+props.data.item}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setShowModal(false)}}></button>
                        </div>
                        <div className="modal-body">
                            <p>{props.data.item}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false);}}>取消</button>
                            <button type="button" className="btn btn-primary">送出訂單</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </li>
    )
}