
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import AllDrinks from "../src/components/AllDrinks";
import NavBar from "../src/components/NavBar";
import { getMenu } from "../src/services/api";
import OrderList from "../src/components/OrderList";
import { menu } from "../src/services/menu-backup";

import AOS from 'aos';
// import poring from './images/poring-xmas-unscreen.gif';

export const AppContext = React.createContext();

function App() {
  const [drinkData, setDrinkData] = useState(menu);
  const [fallback, setFallback] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [focusDrinkId, setFocusDrinkId] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  const backgroungImgUrl = "https://i.imgur.com/SDLzr35.jpg";

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
    setFocusDrinkId,
    fallback
  };

  return (
    <AppContext.Provider value={appContext}>
      <div className="App" data-aos="fade-in" data-aos-delay="700">
        <Router>
          <NavBar drinkData={drinkData} />
          {fallback &&
            <div className="alert alert-warning" role="alert">
              因後端系統異常切換到備用點餐系統，速度較慢敬請見諒
            </div>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Redirect
                  to={{ pathname: "/drinks/all" }}
                />
              </Route>
              <Route exact path="/drinks">
                <Redirect
                  to={{ pathname: "/drinks/all" }}
                />
              </Route>
              <Route path="/drinks/:series">
                <AllDrinks />
              </Route>
              <Route exact path="/orders">
                <OrderList />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
      <footer className="bd-footer p-3 mt-5 text-center text-sm-start" style={{position: "relative"}}>
        <div className="container">
          <ul className="bd-footer-links ps-0 mb-3">
            <li className="d-inline-block"><a href="https://github.com/jackraken/datalab-drinks-frontend">GitHub</a></li>
          </ul>
          <div className="d-flex flex-row">
            <p className="mb-0">Designed and built with all the love in the world by the <a href="http://www.cs.nthu.edu.tw/~shwu/">Datalab</a> with the help of <a href="https://www.camacafe.com/">cama coffee</a>(03)571-1500.</p>
          </div>
        </div>
      </footer>
    </AppContext.Provider>
  );
}

export default App;
