import React, { useEffect, useState } from "react";
import OrderCell from "../components/OrderCell";
import OrderSummary from "../components/OrderSummary";
import { getOrders } from "../services/api";

export default function OrderList(props) {
    const [orderSummary, setOrderSummary] = useState([]);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        getOrders()
        .then(items => {
            console.log(items);
            if(items){
                setOrderData(items.payload.week_orders || []);
                setOrderSummary(items.payload.aggregate_orders || []);
            }else{
                setOrderData([]);
            }
            
        })
        return () => {}
    }, [])

    return(
        <div className="container" id="order-list">
            <OrderSummary data={orderSummary}/>
            <div className="row mt-4">
                <h1>清單</h1>
                <ul className="list-group list-group-flush">
                    {orderData.map((item, key) => {
                        return (<OrderCell key={key} data={item}/>)
                    })}
                </ul>
            </div>
        </div>
    )
}