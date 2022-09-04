
import { appWithTranslation } from "next-i18next";
import { SSRProvider } from 'react-bootstrap';
import { AppContextProvider } from "../common/contexts/AppContext";
import Script from "next/script";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";

import "../styles/globals.css"
import "../styles/main.scss";
import "aos/dist/aos.css";
import Aos from "aos";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-TG34K65' });

    //TODO: multiple AOS init?
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50
    });
  }, []);

  return <SSRProvider>
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous" />
  </SSRProvider>
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default appWithTranslation(MyApp);





// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from "next/head";
// import { appWithTranslation, useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import TagManager from 'react-gtm-module';
// import NextNprogress from 'nextjs-progressbar';
// import AOS from "aos";

// import '../styles/globals.css'
// import 'aos/dist/aos.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AppContext } from '../utils/context';
// import MyNavBar from '../components/MyNavBar';
// import { SSRProvider } from 'react-bootstrap';
// import MyFooter from '../components/MyFooter';

// TODO
// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     TagManager.initialize({ gtmId: 'GTM-MRRTLKB' });

//     AOS.init({
//       easing: "ease-out-cubic",
//       once: true,
//       offset: 50
//     });
//   }, []);

//   const { t } = useTranslation("common");
//   const route = useRouter();

//   return (
//     <SSRProvider>
//       <AppContext>
//       {/* <Head>
//         {
//           <title>{t("Far Star Studio")}</title>
//         }
//         <link rel="icon" href="/farstar3.ico" />
//       </Head> */}
//         <MyNavBar />
//         <Component {...pageProps} />
//         <MyFooter />
//       </AppContext>
//     </SSRProvider>
//   )
// }

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common']),
//   },
// })

// export default appWithTranslation(MyApp);

