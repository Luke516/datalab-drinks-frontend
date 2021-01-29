import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import SingleOptionButtonGroup from "./SingleOptionButtonGroup";
import './DrinkCell.css';

export default function OrderModal(props) {
    const[size, setSize] = useState("");
    const[sugar, setSugar] = useState("");
    const[ice, setIce] = useState("");
    const[flavor, setFlavor] = useState("");

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    if(!props.data.cold){
        iceLevels = iceLevels.filter((e) => {return e["id"] !== "2" && e["id"] !== "3"});
    }

    if(!props.data.hot){
        iceLevels = iceLevels.filter((e) => {return e["id"] !== "1"});
    }

    return(
        <div className="full-window popup-background" style={{position: "fixed", display: "block", backgroundColor: "rgba(0,0,0,0.25)"}}>
            <div className="modal" style={{position: "fixed", display: "block"}}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{"訂購一杯"+props.data.item}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={()=>{props.setShowModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="my-2">
                            <span className="mb-2">大小</span>
                            <div className="select-size">
                                <SingleOptionButtonGroup title="size" options={Object.keys(props.data.prices)} onChange={setSize} />
                            </div>
                        </div>
                        <div className="my-2">
                            <span>溫度</span>
                            {(!props.data.cold || !props.data.hot) &&
                                <span style={{color: "gray"}}><small>
                                    *本飲料不提供
                                    {!props.data.cold && "冷飲"}
                                    {!props.data.hot && "熱飲"}
                                </small></span>
                            }
                            <div>
                                <SingleOptionButtonGroup title="ice" options={iceLevels.map(iceLevel => iceLevel["tag"])} onChange={setIce} />
                            </div>
                        </div>
                        <div className="my-2">
                            <span>甜度</span>
                            <div className="select-ice">
                                <SingleOptionButtonGroup title="sugar" options={sugarLevels.map(sugarLevel => sugarLevel["tag"])} onChange={setSugar} />
                            </div>
                        </div>
                        {props.data.flavor &&
                            <div className="my-2">
                                <span>口味</span>
                                <div className="select-flavor">
                                    <SingleOptionButtonGroup title="flavor" options={props.data.flavor} onChange={setFlavor} />
                                </div>
                            </div>
                        }
                        <div className="my-2">
                            <span>訂購人</span>
                            <input type="text" className="mt-2 form-control" placeholder="你的名字" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" onClick={()=>{props.setShowModal(false);}}>取消</button> */}
                        <button type="button" className="btn btn-primary">送出訂單</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}