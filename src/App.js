import "./main.scss";
import React, {Suspense, useEffect, useState} from 'react';
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

export const AppContext = React.createContext();

function App() {
  const [drinkData, setDrinkData] = useState(null);

  useEffect(() => {
      getMenu()
      .then(items => {
          console.log(items);
          setDrinkData(items);
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
          </Switch>
        </Suspense>
      </Router>
    </div>
    </AppContext.Provider>
  );
}

export default App;
