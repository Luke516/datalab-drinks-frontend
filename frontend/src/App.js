import "./main.scss";
import "./App.css";
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

export const AppContext = React.createContext();

function App() {
  const [drinkData, setDrinkData] = useState([]);

  useEffect(() => {
      getMenu()
      .then(items => {
          console.log(items);
          console.log(items.payload);
          setDrinkData(items.payload);
      })
      return () => {}
  }, [])

  const appContext = {
    drinkData
  };

  return (
    <AppContext.Provider value={appContext}>
    <div className="App">
      <Router>
        <NavBar drinkData={drinkData}/>
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
                <AllDrinks drinkData={drinkData}/>
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
