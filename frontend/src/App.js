import "./main.scss";
import "./App.css";
import "animate.css";
import React, {Suspense, useEffect, useState, useCallback} from 'react';
import {
  BrowserRouter as Router,
  useRouteMatch,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import AllDrinks from "./components/AllDrinks";
import NavBar from "./components/NavBar";
import { getMenu } from "./services/api";
import OrderList from "./components/OrderList";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export const AppContext = React.createContext();

function App() {
  const [drinkData, setDrinkData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [focusDrinkId, setFocusDrinkId] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  const backgroungImgUrl = "https://i.imgur.com/SDLzr35.jpg";

  useEffect(() => {
    AOS.init({
      duration : 2000
    });

    getMenu()
    .then(items => {
        console.log(items);
        console.log(items.payload);
        setDrinkData(items.payload);

        setTimeout(()=>{
          window._jf.flush();
        }, 500);
    })
  }, [])

  useEffect(()=>{
    let backImg = new Image();
    backImg.src = backgroungImgUrl;
    backImg.onload = () => {
        setShowBackground(true);
    };
  }, []);

  const appContext = {
    drinkData,
    showSuccessModal,
    setShowSuccessModal,
    focusDrinkId,
    setFocusDrinkId
  };

  return (
    <AppContext.Provider value={appContext}>
    <div className="App" data-aos="fade-in" data-aos-delay="700">
      <Router>
        <NavBar drinkData={drinkData}/>
        {showBackground &&
          <div className="vh-100 vw-100 position-fixed" data-aos="fade-in" style={{
              top: 0,
              zIndex: -1,
              backgroundImage: `url(${backgroungImgUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              filter: "blur(8px)"
          }}></div>
        }
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Redirect
                to={{pathname: "/drinks/all"}}
              />
            </Route>
            <Route exact path="/drinks">
              <Redirect
                to={{pathname: "/drinks/all"}}
              />
            </Route>
            <Route path="/drinks/:series">
                <AllDrinks/>
            </Route>
            <Route exact path="/orders">
              <OrderList/>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
    <footer className="bd-footer p-3 mt-5 bg-light text-center text-sm-start">
      <div className="container">
        <ul className="bd-footer-links ps-0 mb-3">
          <li className="d-inline-block"><a href="https://github.com/jackraken/datalab-drinks-frontend">GitHub</a></li>
        </ul>
        <p className="mb-0">Designed and built with all the love in the world by the <a href="http://www.cs.nthu.edu.tw/~shwu/">Datalab</a> with the help of <a href="https://www.camacafe.com/">cama coffee</a>(03)571-1500.</p>
      </div>
    </footer>
    </AppContext.Provider>
  );
}

export default App;
