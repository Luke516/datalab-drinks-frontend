import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head'
import Image from 'next/image'
import { useAppContext } from "../../common/contexts/AppContext";
import DrinkSection from "../../common/components/menu/DrinkSection";
import Layout from "../../common/layouts/Layout";
import { useEffect } from "react";
import Aos from "aos";
import { getMenu } from "@/modules/data/menu";

export default function Home() {
	const router = useRouter();
	const { drinkData } = useAppContext();
	const curSeries = router.query.series;

	useEffect(() => {
		Aos.init({
			duration: 2000
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (window._jf && typeof window._jf.flush === "function") window._jf.flush();
		}, 200)
	}, []);

	return (
		<Layout backgroundImageUrl={"https://i.imgur.com/SDLzr35.jpg"}>
			<div className="container tab-content" data-aos="fade-in" data-aos-duration="300" id="nav-tabContent">
				{/* {`${JSON.stringify(router.query)}`} */}
				{drinkData && drinkData.menu &&
					drinkData.menu.map((series, key) => {
						return (
							(curSeries == key || curSeries == "all") ?
								<div key={key} className={"tab-panefadeactiveshow"} id={"drink" + key} role="tabpanel" aria-labelledby={`drink-${key}-tab`}>
									<DrinkSection series={series} />
								</div> :
								<div key={key}></div>
						)
					})
				}
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const menu = getMenu().payload.menu;

	let paths = [{
		params: { series: "all" },
	}, {
		params: { series: "all" },
		locale: "zh",
	}, {
		params: { series: "all" },
		locale: "en",
	},];

	for (let i = 0; i < menu.length; i++) {
		paths.push({
			params: { series: `${i}` },
		});
		paths.push({
			params: { series: `${i}` },
			locale: "zh",
		});
		paths.push({
			params: { series: `${i}` },
			locale: "en",
		});
	}

	return {
		paths: paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
})