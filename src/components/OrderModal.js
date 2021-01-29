import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import SingleOptionButtonGroup from "./SingleOptionButtonGroup";
import './DrinkCell.css';

export default function OrderModal(props) {
    const[size, setSize] = useState("");
    const[sugar, setSugar] = useState("");
    const[ice, setIce] = useState("");

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    const iceLevels = appContext.drinkData.ice;

    return(
        <div className="full-window popup-background" style={{position: "fixed", display: "block", backgroundColor: "rgba(0,0,0,0.25)"}}>
            <div className="modal" style={{position: "fixed", display: "block"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{"訂購一杯"+props.data.item}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={()=>{props.setShowModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="my-2">
                            <p>大小</p>
                            <div className="select-size">
                                <SingleOptionButtonGroup title="size" options={Object.keys(props.data.prices)} onChange={setSize} />
                            </div>
                        </div>
                        <div className="my-2">
                            <p>溫度</p>
                            <div>
                                <SingleOptionButtonGroup title="ice" options={iceLevels.map(iceLevel => iceLevel["tag"])} onChange={setIce} />
                            </div>
                        </div>
                        <div className="my-2">
                        <p>甜度</p>
                            <div className="select-ice">
                                <SingleOptionButtonGroup title="sugar" options={sugarLevels.map(sugarLevel => sugarLevel["tag"])} onChange={setSugar} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>{props.setShowModal(false);}}>取消</button>
                        <button type="button" className="btn btn-primary">送出訂單</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}