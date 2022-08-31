import AOS from "aos"
import { useEffect } from "react"

import "../styles/main.scss";
import "../styles/App.css";
// import "../styles/animate.css";
import '../styles/NavBar.css'
import '../styles/LoadingSpinner.css'
import "../styles/DrinkSection.css"
import '../styles/DrinkCell.css';
import "../styles/AllDrink.css";
import '../styles/index.css';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default function App({ Component, pageProps }) {

	useEffect(()=>{
		init();
	}, [])

	init = () => {
		AOS.init({
      duration: 2000
    });

		getMenu()
      .then(items => {
        console.log(items);
        console.log(items.payload);
        setDrinkData(items.payload);
      })
      .catch((error) => {
        console.log(error);
        setFallback(true);
      })
      .finally(() => {
        setTimeout(() => {
          if (window._jf) window._jf.flush();
        }, 500);
      })
	}

	return (
		<div>QWQ</div>
	)
}
