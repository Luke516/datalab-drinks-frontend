// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getOrdersRemote, submitOrderRemote } from "../../modules/api/drinkMenu"
import { getOrderList, getOrderSummaryFromOrderList, submitOrder } from "../../modules/backend/order";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        if(!req.body) { 
            res.status(400).send();
        }
        else {
            const orderData = req.body;
            const orderResponse = await submitOrderRemote(orderData);
            await submitOrder(orderData);
            res.status(200).json(orderResponse);
        }
    } else if (req.method === 'GET') {
        // Handle any other HTTP method

        // TODO
        // const orders = await getOrdersRemote();
        const weekOrders = await getOrderList();
        const aggregated = getOrderSummaryFromOrderList(weekOrders); //TODO: naming
        const payload = {
            //TODO: "meeting_time": "2021-02-12T13:00:00+08:00","total_price": 330,
            status_message: "ok",
            payload: {
                week_orders: weekOrders,
                aggregate_orders: aggregated
            }
        }
        res.status(200).json(payload);
    }
}
