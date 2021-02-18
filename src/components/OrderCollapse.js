import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { serverBaseURL, submitOrder } from "../services/api";
import SingleOptionButtonGroup from "./SingleOptionButtonGroup";

export default function OrderCollpase(props) {
    const[size, setSize] = useState("");
    const[sugar, setSugar] = useState("");
    const[ice, setIce] = useState("");
    const[flavor, setFlavor] = useState("");
    const[name, setName] = useState("QWQ");

    const appContext = useContext(AppContext);
    const sugarLevels = appContext.drinkData.sugar;
    let iceLevels = appContext.drinkData.ice;

    if(!props.data.cold){
        iceLevels = iceLevels.filter((e) => {return e["id"] !== "2" && e["id"] !== "3"});
    }

    if(!props.data.hot){
        iceLevels = iceLevels.filter((e) => {return e["id"] !== "1"});
    }

    const submit = () => {
        submitOrder({
            name,
            id: props.data.id,
            ice,
            sugar
        })
        .then((jsonData)=>{
            console.log(jsonData);
        });
    }

    return(
        <div class="collapse" id={props.data.item}>
            <div className="order-content p-2">
                <div className="row">
                    {/* <div className="col-lg-2">
                    </div> */}
                    <div className="row col-lg-10">
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span className="">大小</span>
                            <div className="select-size ms-2 flex-grow-1">
                                <SingleOptionButtonGroup title="size" options={props.data.large_price === 0? ["中"]: props.data.medium_price === 0? ["大"]: ["中", "大"] } onChange={setSize} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>溫度</span>
                            {(!props.data.cold || !props.data.hot) &&
                                <span style={{color: "gray"}}><small>
                                    *本飲料不提供
                                    {!props.data.cold && "冷飲"}
                                    {!props.data.hot && "熱飲"}
                                </small></span>
                            }
                            <div className="select-hot ms-2 flex-grow-1">
                                <SingleOptionButtonGroup title="ice" options={iceLevels.map(iceLevel => iceLevel["ice_tag"])} values={iceLevels.map(iceLevel => iceLevel["id"])} onChange={setIce} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>甜度</span>
                            <div className="select-ice ms-2 flex-grow-1">
                                <SingleOptionButtonGroup title="sugar" options={sugarLevels.map(sugarLevel => sugarLevel["sugar_tag"])} values={sugarLevels.map(sugarLevel => sugarLevel["id"])} onChange={setSugar} />
                            </div>
                        </div>
                        {props.data.flavor &&
                            <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                                <span>口味</span>
                                <div className="select-flavor ms-2 flex-grow-1">
                                    <SingleOptionButtonGroup title="flavor" options={props.data.flavor} onChange={setFlavor} />
                                </div>
                            </div>
                        }
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>訂購人</span>
                            <div className="select-name ms-2 flex-grow-1">
                                <input type="text" className="mt-2 form-control" placeholder="你的名字" aria-label="Username" aria-describedby="basic-addon1" />
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