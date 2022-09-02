import Link from 'next/link'
import Head from 'next/head'
import { useTranslation } from 'next-i18next';
import Image from "next/image";

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
			<Image alt="background" src={backgroundImageUrl} /*TODO: placeholder="blur"*/  layout="fill" objectFit="cover"/>
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
			</Head>
			{backgroundDiv}
			{/*　TODO <header>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>{' '}
                    |
                    <Link href="/about">
                        <a>About</a>
                    </Link>{' '}
                    |
                    <Link href="/contact">
                        <a>Contact</a>
                    </Link>
                </nav>
            </header> */}

			{children}
			{/*  TODO　<footer>{'I`m here to stay'}</footer> */}
		</>
	)
}
