import { db } from "./firebase";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { getStartOfOrderCycle } from "./utils";

import ice from "./assets/ice.yaml";
import sugar from "./assets/sugar.yaml";
import menu from "./assets/cama_menu.yaml";


// TODO: error handling
// TODO: handle duplicate and timeout
export async function submitOrder(data) {
	try {
		const docRef = await setDoc(doc(db, "orders", data.order_by), {
			...data,
			timestamp: Timestamp.fromDate(new Date()),
		});
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
	// const startTimestamp = Timestamp.fromDate(new Date());
	const startTimestamp = new Timestamp(getStartOfOrderCycle());
	console.log("startTimestamp"); //TODO
	console.log(startTimestamp);

	const q = query(collection(db, "orders"), where("timestamp", ">", startTimestamp));
	const querySnapshot = await getDocs(q);

	let orders = [];
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		const order = doc.data();
		console.log(order); //TODO
		orders.push({
			...order,
			timestamp: order.timestamp.seconds 
		});
	});
	return preloadOrders(orders);
}

// NOTE: get tag from id
// TODO: better structure
const preloadOrders = (orders) => {
	return orders.map((order) => {
		const { item_id, ice_id, sugar_id } = order;
		const ice_tag = ice.ices[ice_id - 1].ice_tag;
		const sugar_tag = sugar.sugars[sugar_id - 1].sugar_tag;
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
