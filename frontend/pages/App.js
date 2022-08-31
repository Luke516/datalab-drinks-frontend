import "./main.scss";
import "./App.css";
import "animate.css";
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  useRouteMatch,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import AllDrinks from "../src/components/AllDrinks";
import NavBar from "../src/components/NavBar";
import { getMenu } from "../src/services/api";
import OrderList from "../src/components/OrderList";
import { menu } from "../src/services/menu-backup";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import poring from './images/poring-xmas-unscreen.gif';

export const AppContext = React.createContext();
const snowTheme = false;

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

  useEffect(() => {
    if(!snowTheme) return;
    if (showBackground) {
      (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
        window.requestAnimationFrame = requestAnimationFrame;
      })();


      var flakes = [],
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        flakeCount = 400,
        mX = -100,
        mY = -100

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
          var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;

          var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

          if (dist < minDist) {
            var force = minDist / (dist * dist),
              xcomp = (x - x2) / dist,
              ycomp = (y - y2) / dist,
              deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

          } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
              flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
          }

          ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
          flake.y += flake.velY;
          flake.x += flake.velX;

          if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
          }


          if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
          }

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(snow);
      };

      function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;
        flake.speed = (Math.random() * 1) + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;
      }

      function init() {
        for (var i = 0; i < flakeCount; i++) {
          var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

          flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
          });
        }

        snow();
      };

      canvas.addEventListener("mousemove", function (e) {
        mX = e.clientX;
        mY = e.clientY;
      });

      window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      })

      init();
    }
  }, [showBackground])

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
          {showBackground &&
            <>
              <div className="vh-100 vw-100 position-fixed" data-aos="fade-in" style={{
                top: 0,
                zIndex: -1,
                backgroundImage: `url(${backgroungImgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: "blur(8px)"
              }}></div>
              <canvas id="canvas" style={{position: "fixed"}}></canvas>
            </>
          }
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
            {
              snowTheme &&
              <img src={poring} />
            }
          </div>
        </div>
      </footer>
    </AppContext.Provider>
  );
}

export default App;
