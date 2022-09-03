import fs from "fs";
import yaml from "js-yaml";

import ice from "./assets/ice.yaml";
import sugar from "./assets/sugar.yaml";
import menu from "./assets/cama_menu.yaml";

let menuCombined = null;

export function getMenu() {
	// Get document, or throw exception on error
	// console.log(sugar);
	// console.log(JSON.stringify(menu));
	// console.log(JSON.stringify(menu.menu[0]));
	const payload = combineMenu(menu, sugar, ice);
	// console.log(JSON.stringify(data)); TODO
	// try {
	// 	const doc = yaml.load(fs.readFileSync(ice, "utf8"));
	// 	console.log(doc);
	// } catch (e) {
	// 	console.log(e);
	// }
	return {
		payload
	};
}


function getIceLevels (ice, cold_adjustable=false, hot_adjustable=false) {
	return ice.ices.map((value)=>{
		const enable = (value.ice_id === 1 && hot_adjustable) || (value.ice_id > 1 && cold_adjustable);
		return {
			...value,
			enable: enable
		}
	})
}


function getSugarLevels (sugar, sugar_adjustable=false) {
	return sugar.sugars.map((value)=>{
		const enable = (value.sugar_id === 4) || (sugar_adjustable);
		return {
			...value,
			enable: enable
		}
	})
}

function combineMenu(menu, sugar, ice) {
	if(menuCombined) {
		return menuCombined;
	}
	try{
		for(let series of menu.menu) {
			series.items = series.items.map((value, idx)=>{
				console.log(value);
				const { item_id, item, large_price, medium_price, sugar_adjustable, cold_adjustable, hot_adjustable } = value;
				return {
					item_id,
					item,
					large_price,
					medium_price,
					ices: getIceLevels(ice, cold_adjustable, hot_adjustable),
					sugars: getSugarLevels(sugar, sugar_adjustable)
				};
			});
		}
		menuCombined = menu;
		return menu;
	}
	catch(err) {
		console.error(err);
		return {};
	}
}