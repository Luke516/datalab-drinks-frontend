import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import NavBar from "../components/nav/NavBar";
import Footer from "../components/nav/Footer";

import styles from "./Layout.module.css";

export default function Layout({
	children,
	title = "Datalab Drinks",
	description = "Drink ordering system for NTHU Datalab",
	backgroundImageUrl
}) {
	const { t } = useTranslation("common");

	const backgroundDiv = backgroundImageUrl ?
		<div className="vh-100 vw-100 position-fixed" data-aos="fade-in" style={{
			top: 0,
			zIndex: -1,
			// backgroundImage: `url(${backgroungImgUrl})`,
			// backgroundRepeat: "no-repeat",
			// backgroundSize: "cover",
			filter: "blur(8px)"
		}}>
			<Image alt="background" src={backgroundImageUrl} /*TODO: placeholder="blur"*/ layout="fill" objectFit="cover" />
		</div> :
		<></>
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>{t(title)}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content={t(description)}
					key="description"
				/>
				{/* TODO? */}
				{/* <link href='//fonts.googleapis.com/css?family=Alegreya:400|Alegreya:700|Arapey:400|Vollkorn:400|Alegreya:700' rel='stylesheet' type='text/css' /> */}
			</Head>
			{/* TODO */}
			<Script src="//s3-ap-northeast-1.amazonaws.com/justfont-user-script/jf-63416.js" />
			<div className={styles["app-layout"] + " d-flex flex-column"}>
				<NavBar />
				{backgroundDiv}
				<div className={styles["content"]}>
					{children}
				</div>
				<div className={styles["footer"]}>
					<Footer />
				</div>
			</div>
		</>
	)
}
