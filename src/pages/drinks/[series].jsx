import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head'
import Image from 'next/image'
import { useAppContext } from "../../common/contexts/AppContext";
import DrinkSection from "../../common/components/menu/DrinkSection";
import Layout from "../../common/layouts/Layout";
import { useEffect } from "react";
import Aos from "aos";

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
			if (window._jf  && typeof window._jf.flush === "function") window._jf.flush();
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

	return {
		// TODO: iterate possible combinations
		paths: [
			{
				params: { series: "all" },
			},
			{
				params: { series: "0" },
			},
			{
				params: { series: "1" },
			},
			{
				params: { series: "2" },
			},
			{
				params: { series: "3" },
			},
			{
				params: { series: "4" },
			},
			{
				params: { series: "5" },
			},
			{
				params: { series: "all" },
				locale: "zh",
			},
			{
				params: { series: "0" },
				locale: "zh",
			},
			{
				params: { series: "1" },
				locale: "zh",
			},
			{
				params: { series: "2" },
				locale: "zh",
			},
			{
				params: { series: "3" },
				locale: "zh",
			},
			{
				params: { series: "4" },
				locale: "zh",
			},
			{
				params: { series: "5" },
				locale: "zh",
			},

			{
				params: { series: "all" },
				locale: "en",
			},
			{
				params: { series: "0" },
				locale: "en",
			},
			{
				params: { series: "1" },
				locale: "en",
			},
			{
				params: { series: "2" },
				locale: "en",
			},
			{
				params: { series: "3" },
				locale: "en",
			},
			{
				params: { series: "4" },
				locale: "en",
			},
			{
				params: { series: "5" },
				locale: "en",
			},
		],
		fallback: false,
	}
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
})