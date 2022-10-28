import { Timestamp } from "firebase-admin/firestore";
import { db } from "./firebase";
import { getStartOfOrderCycle } from "./utils";


export async function getCustomers() {
	const startTimestamp = new Timestamp(getStartOfOrderCycle(), 0);
    
	let customers = [];
	const docs = await db.collection("orders").orderBy("timestamp", "desc").limit(100).get()
	docs.forEach(doc => {
		const order = doc.data();
		customers.push(order.order_by);
	})
	return customers;
}
