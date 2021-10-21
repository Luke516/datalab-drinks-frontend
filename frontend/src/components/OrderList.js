import React, { useEffect, useState, useContext } from "react";
import OrderCell from "../components/OrderCell";
import OrderSummary from "../components/OrderSummary";
import { getOrders, getOrdersBackup } from "../services/api";
import Tree from 'react-animated-tree'
import { AppContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";

export default function OrderList(props) {
    const [loading, setLoading] = useState(true);
    const [orderSummary, setOrderSummary] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [backupOrderData, setBackupOrderData] = useState([]);

    const appContext = useContext(AppContext);
    const {fallback} = appContext;

    const orderCompare = ( a, b ) => {
        let aa = a.item + a.ice_tag + a.sugar_tag;
        let bb = b.item + b.ice_tag + b.sugar_tag;

        if ( aa < bb ){
          return -1;
        }
        if ( aa > bb ){
          return 1;
        }
        return 0;
    }

    useEffect(() => {
        if(!fallback){
            getOrders().then((items) => {
                console.log(items);
                if(items){
                    console.log(items.payload);
                    setOrderData(items.payload.week_orders.sort(orderCompare) || []);
                    setOrderSummary(items.payload.aggregate_orders || []);
                }else{
                    setOrderData([]);
                }
                setLoading(false);
            });
        }
        getOrdersBackup().then((items) => {
            console.log(items);
            if(items){
                console.log(items.payload);
                setBackupOrderData(items.payload.week_orders.sort(orderCompare) || []);
            }else{
                setOrderData([]);
            }
        });
    }, []);

    useEffect(()=>{
        setTimeout(()=>{
            if(window._jf) window._jf.flush();
        }, 500)
    }, []);

    return(
        <React.Fragment>
            <div className="container" id="order-list" data-aos="fade-in" data-aos-duration="300">
                <OrderSummary data={orderSummary}/>
                {loading && <LoadingSpinner/>}
                { fallback && 
                    <div className ="alert alert-secondary">
                        <span>暫不提供</span>
                    </div> 
                }

                {/* <Tree content="Apple" type="Fruit" open canHide visible onClick={console.log}>
                    <Tree content="Contents">
                        <Tree content="Seeds" />
                    </Tree>
                </Tree> */}

                <div className="row mt-4">
                    <h1>清單</h1>
                    {loading && <LoadingSpinner/>}
                    <ul className="list-group list-group-flush">
                        {orderData.map((item, key) => {
                            return (<OrderCell key={key} data={item}/>)
                        })}
                        {fallback && <span>以下是備用系統訂單</span>}
                        {backupOrderData.map((item, key) => {
                            return (<OrderCell key={key + 100} data={item}/>)
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}