
import React, { useContext, useState, useRef, useEffect } from "react";
import { Hint } from 'react-autocomplete-hint';
import { getCustomers, serverBaseURL, submitOrder, submitOrderBackUp } from "../../../modules/api/drinkMenu";
import SingleOptionButtonGroup from "./SingleOptionButtonGroup";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useAppContext } from "../../contexts/AppContext";
import { useMemo } from "react";

export default function OrderSubmitForm(props) {
    const[submitting, setSubmitting] = useState(false);
    const[size, setSize] = useState("medium");
    const[sugar, setSugar] = useState("");
    const[ice, setIce] = useState("");
    const nameInput = useRef(null);

    const { fallback, showSuccessModal, setShowSuccessModal, customers} = useAppContext();

    useEffect(()=>{
        let username = localStorage.getItem('name') || "";
        if(username.length > 1){
            nameInput.current.value = username;
        }
    }, [])

    const submit = () => {
        setSubmitting(true);
        let name = nameInput.current.value;
        if(name.length < 1){
            alert("請寫名字 QWQ!");
            return;
        }
        localStorage.setItem('name', name);
        (fallback ? submitOrder :submitOrder)({
            name,
            id: props.data.item_id,
            size,
            ice,
            sugar
        })
        .then((response)=>{
            if(response.ok){
                alert("訂購成功!");
                // console.log("訂購成功!"); TODO
                setShowSuccessModal(true);
                setSubmitting(false);
            }
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
                                <SingleOptionButtonGroup id={props.data.item} title="ice" options={props.data.ices.reduce((result, iceLevel) => {return iceLevel["enable"] ? result.concat([iceLevel["ice_tag"]]) : result}, [])} values={props.data.ices.reduce((result, iceLevel) => {return iceLevel["enable"] ? result.concat([iceLevel["ice_id"]]) : result}, [])} onChange={setIce} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>甜度</span>
                            <div className="select-ice ms-2 flex-grow-1">
                                <SingleOptionButtonGroup id={props.data.item} title="sugar" options={props.data.sugars.reduce((result, sugarLevel) => {return sugarLevel["enable"] ? result.concat([sugarLevel["sugar_tag"]]) : result}, [])} values={props.data.sugars.reduce((result, sugarLevel) => {return sugarLevel["enable"] ? result.concat([sugarLevel["sugar_id"]]) : result}, [])} onChange={setSugar} />
                            </div>
                        </div>
                        <div className="my-2 col-lg-6 d-flex flex-row align-items-center">
                            <span>訂購人</span>
                            <div className="select-name ms-2 flex-grow-1">
                                <Hint options={customers}>
                                    <input ref={nameInput} type="text" className="mt-2 form-control" placeholder="你的名字" aria-label="Username" aria-describedby="basic-addon1" />
                                </Hint>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 px-0 py-2">
                        <button type="button" className="btn btn-outline-primary w-100 h-100" onClick={submit}>
                            {submitting? <LoadingSpinner/> : <span>送出訂單</span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}