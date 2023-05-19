import { db } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";
import { getStartOfOrderCycle } from "./utils";

import ice from "./assets/ice.yaml";
import sugar from "./assets/sugar.yaml";
import menu from "./assets/cama_menu.yaml";


// TODO: error handling
// TODO: handle duplicate and timeout
export async function submitOrder(data) {
	const orderer = data.order_by
	try {
		await db.collection("orders").doc(orderer).set({
			...data,
			timestamp: Timestamp.fromDate(new Date()),
		})
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

// TODO: use query
export function getOrderSummaryFromOrderList(orderList) {
	let aggregatedOrders = [];
	orderList.forEach((order) => {
		const { item_id, ice_id, sugar_id, size, ice_tag, sugar_tag, item } = order;
		const key = [item_id, ice_id, sugar_id, size].join("-");
		let existingRecord = aggregatedOrders[key];
		if( !existingRecord ){
			aggregatedOrders[key] = {
				item_id, 
				ice_id, 
				sugar_id, 
				size,
				ice_tag,
				sugar_tag,
				item,
				number: 1
			}
		}
		else {
			existingRecord.number = existingRecord.number + 1;
		}
	});
	return Object.values(aggregatedOrders);
}

export async function getOrderList() {
	const startTimestamp = new Timestamp(getStartOfOrderCycle(), 0);
	console.log("startTimestamp: ", startTimestamp); //TODO: debug

	let orders = [];
	const docs = await db.collection("orders").where("timestamp", ">", startTimestamp).get()
	docs.forEach(doc => {
		const order = doc.data();
		orders.push({
			...order,
			timestamp: order.timestamp.seconds 
		});
	})
	return preloadOrders(orders);
}

// NOTE: get tag from id
// TODO: better structure
const preloadOrders = (orders) => {
	return orders.map((order) => {
		const { item_id, ice_id, sugar_id } = order;
		const ice_tag = ice.ices[ice_id - 1]?.ice_tag || ice.ices[ice.ices.length - 1]?.ice_tag;
		const sugar_tag = sugar.sugars[sugar_id - 1]?.sugar_tag || sugar.sugars[sugar.sugars.length - 1]?.sugar_tag;
		let item = "undefined";
		//TODO: better algo
		for(let series of menu.menu) {
			for(let i of series.items) {
				if(i.item_id === item_id) {
					item = i.item;
					break;
				}
			}
		}
		return {
			...order,
			ice_tag,
			sugar_tag,
			item
		}
	})
}
