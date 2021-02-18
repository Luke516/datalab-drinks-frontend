import React, { useEffect, useState } from "react";
import OrderCell from "../components/OrderCell";
import DrinkCell from "../components/OrderCell";
import { getOrders } from "../services/api";

export default function OrderList(props) {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        getOrders()
        .then(items => {
            console.log(items);
            if(items){
                setOrderData(items.payload.week_orders);
            }else{
                setOrderData([]);
            }
            
        })
        return () => {}
    }, [])

    return(
        <div className="row">
            <ul className="list-group list-group-flush">
                {orderData.map((item, key) => {
                    return (<OrderCell key={key} data={item}/>)
                })}
            </ul>
        </div>
    )
}