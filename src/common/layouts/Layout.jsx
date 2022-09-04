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
			{/* <!-- Google Tag Manager --> */}
			{/* <Script id="google-tag-manager" strategy="afterInteractive">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','GTM-KFT33QG');`}
			</Script> */}
			{/* <!-- End Google Tag Manager --> */}
			<Script src="//s3-ap-northeast-1.amazonaws.com/justfont-user-script/jf-63416.js" />
			{/* <!-- Google Tag Manager (noscript) --> */}
			{/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFT33QG"
				height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
			{/* <!-- End Google Tag Manager (noscript) --> */}
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
