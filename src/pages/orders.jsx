import React, { useEffect, useState, useContext } from "react";
import OrderCell from "../common/components/order/OrderCell";
import OrderSummary from "../common/components/order/OrderSummary";
import { getOrders, getOrdersBackup } from "../modules/fetch/drinkMenu";
import LoadingSpinner from "../common/components/utils/LoadingSpinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppContext } from "../common/contexts/AppContext";
import Layout from "../common/layouts/Layout";

export default function Orders(props) {
	const [loading, setLoading] = useState(true);
	const [orderSummary, setOrderSummary] = useState([]);
	const [orderData, setOrderData] = useState([]);
	const [backupOrderData, setBackupOrderData] = useState([]);

	const appContext = useAppContext();
	const { fallback } = appContext;

	const orderCompare = (a, b) => {
		let aa = a.item + a.ice_tag + a.sugar_tag;
		let bb = b.item + b.ice_tag + b.sugar_tag;

		if (aa < bb) {
			return -1;
		}
		if (aa > bb) {
			return 1;
		}
		return 0;
	}

	useEffect(() => {
		getOrders().then((items) => {
			console.log(items);
			if (items) {
				console.log(items.payload);
				setOrderData(items.payload.week_orders.sort(orderCompare) || []);
				setOrderSummary(items.payload.aggregate_orders || []);
			} else {
				setOrderData([]);
			}
			setLoading(false);
			setTimeout(() => {
				if (window._jf && typeof window._jf.flush === "function") window._jf.flush();
			}, 200)
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (window._jf && typeof window._jf.flush === "function") window._jf.flush();
		}, 200)
	}, []);

	return (
		<Layout backgroundImageUrl={"https://i.imgur.com/SDLzr35.jpg"}>
			<div className="container" id="order-list" data-aos="fade-in" data-aos-duration="300">
				<OrderSummary data={orderSummary} loading={loading}/>
				{/* TODO {fallback &&
					<div className="alert alert-secondary">
						<span>暫不提供</span>
					</div>
				} */}

				{/* <Tree content="Apple" type="Fruit" open canHide visible onClick={console.log}>
                    <Tree content="Contents">
                        <Tree content="Seeds" />
                    </Tree>
                </Tree> */}

				{/* TODO : css class */}
				<div className="card p-3 my-4" style={{
					backgroundColor: "rgba(255, 255, 255, 0.8)"
				}}>
					<h1>清單</h1>
					{loading && <LoadingSpinner />}
					<div className="d-flex flex-column">
						<ul className="list-group list-group-flush p-0">
							{orderData.map((item, key) => {
								return (<OrderCell key={key} data={item} />)
							})}
							{fallback && <span>以下是備用系統訂單</span>}
							{backupOrderData.map((item, key) => {
								return (<OrderCell key={key + 100} data={item} />)
							})}
						</ul>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
})