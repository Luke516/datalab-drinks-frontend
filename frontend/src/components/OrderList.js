import React, { useEffect, useState } from "react";
import OrderCell from "../components/OrderCell";
import OrderSummary from "../components/OrderSummary";
import { getOrders } from "../services/api";
import Tree from 'react-animated-tree'

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

    useEffect(()=>{
        setTimeout(()=>{
            window._jf.flush();
        }, 500)
    }, []);

    return(
        <div className="container" id="order-list" data-aos="fade-in" data-aos-duration="300">
            <OrderSummary data={orderSummary}/>

            {/* <Tree content="Apple" type="Fruit" open canHide visible onClick={console.log}>
                <Tree content="Contents">
                    <Tree content="Seeds" />
                </Tree>
            </Tree> */}

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