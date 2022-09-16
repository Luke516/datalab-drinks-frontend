import React, { useState, useContext } from "react";
import { useAppContext } from "../../contexts/AppContext";

export default function OrderSummary(props) {
	const [showModal, setShowModal] = useState(false);

	const appContext = useAppContext();
	const sugarLevels = appContext.drinkData.sugar;
	let iceLevels = appContext.drinkData.ice;

	return (
		<div className="card p-3 my-4" style={{
			backgroundColor: "rgba(255, 255, 255, 0.8)"
		}}>
			<h1>統計</h1>
			{/* TODO */}
			{ props.loading && <LoadingSpinner />}
            {/* <div className="d-flex flex-column">
                <ul className="list-group list-group-flush p-0">
                    {orderData.map((item, key) => {
                        return (<OrderCell key={key} data={item} />)
                    })}
                    {fallback && <span>以下是備用系統訂單</span>}
                    {backupOrderData.map((item, key) => {
                        return (<OrderCell key={key + 100} data={item} />)
                    })}
                </ul>
            </div> */}
			<div className="d-flex flex-column">
				<ul className="list-group list-group-flush p-0">
					{props.data.map((item, key) => {
						return (
							<li key={key} className="list-group-item d-flex flex-column drink-section p-0 bg-transparent">
								<div className="btn p-2">
									<div className="d-flex justify-content-between">
										<span>{`${item.item}(${item.size === "large" ? "大" : "中"})/${item.sugar_tag}/${item.ice_tag}`}</span>
										<span>{item.number}</span>
									</div>
								</div> 
							</li>)
					})}
				</ul>
			</div>
		</div>
	)
}