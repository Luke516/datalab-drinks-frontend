// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMenu, getOrdersBackup, getOrdersRemote, submitOrder, submitOrderRemote } from "../../modules/api/drinkMenu"


export default async function handler(req, res) {
    if (req.method === 'POST') {
        if(!req.body) { 
            res.status(400).send();
        }
        else {
            const orderData = req.body;
            const orderResponse = await submitOrderRemote(orderData);
            res.status(200).json(orderResponse);
        }
    } else if (req.method === 'GET') {
        // Handle any other HTTP method

        const orders = await getOrdersRemote();
        res.status(200).json(orders);
    }
   
}
