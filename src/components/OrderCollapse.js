import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../App";
import { serverBaseURL, submitOrder } from "../services/api";
import SingleOptionButtonGroup from "./SingleOptionButtonGroup";

export default function OrderCollpase(props) {
    const[size, setSize] = useState("medium");
    const[sugar, setSugar] = useState("");
    const[ice, setIce] = useState("");
    const nameInput = useRef(null);

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    if(!props.data.cold){
        iceLevels = iceLevels.filter((e) => {return e["ice_id"] !== 2 && e["id"] !== 3});
    }

    if(!props.data.hot){
        iceLevels = iceLevels.filter((e) => {return e["ice_id"] !== 1});
    }

    const submit = () => {
        let name = nameInput.current.value;
        if(name.length < 1){
            alert("請寫名字 QWQ!");
        }
        submitOrder({
            name,
            id: props.data.item_id,
            size,
            ice,
            sugar
        })
        .then((jsonData)=>{
            console.log(jsonData);
        });
    }

    return(
        <div className="collapse" id={props.data.item}>
            <div className="order-content p-2">
                <div className="row">
                    <div className="row col-lg-10">
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span className="">大小</span>
                            <div className="select-size ms-2 flex-grow-1">
                                <SingleOptionButtonGroup id={props.data.item} title="size" options={props.data.large_price === 0? ["中"]: props.data.medium_price === 0? ["大"]: ["中", "大"] } values={props.data.large_price === 0? ["medium"]: props.data.medium_price === 0? ["large"]: ["medium", "large"] } onChange={setSize} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>溫度</span>
                            {/* {(!props.data.cold || !props.data.hot) &&
                                <span style={{color: "gray"}}><small>
                                    *本飲料不提供
                                    {!props.data.cold && "冷飲"}
                                    {!props.data.hot && "熱飲"}
                                </small></span>
                            } */}
                            <div className="select-hot ms-2 flex-grow-1">
                                <SingleOptionButtonGroup id={props.data.item} title="ice" options={iceLevels.map(iceLevel => iceLevel["ice_tag"])} values={iceLevels.map(iceLevel => iceLevel["ice_id"])} onChange={setIce} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>甜度</span>
                            <div className="select-ice ms-2 flex-grow-1">
                                <SingleOptionButtonGroup id={props.data.item} title="sugar" options={sugarLevels.map(sugarLevel => sugarLevel["sugar_tag"])} values={sugarLevels.map(sugarLevel => sugarLevel["sugar_id"])} onChange={setSugar} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>訂購人</span>
                            <div className="select-name ms-2 flex-grow-1">
                                <input ref={nameInput} type="text" className="mt-2 form-control" placeholder="你的名字" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 px-0 py-2">
                        <button type="button" className="btn btn-outline-primary w-100 h-100" onClick={submit}>送出訂單</button>
                    </div>
                </div>
            </div>
        </div>
    )
}