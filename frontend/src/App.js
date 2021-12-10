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
import NavBar from "./components/NavBar";
import { getParticipantGroups, getParticipants } from "./services/api";
import { IconContext } from "react-icons";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import ParticipantList from "./components/ParticipantList";
import GroupSetting from "./components/GroupSetting";
import EventView from "./components/EventView";

export const AppContext = React.createContext();

const headerAbbrs = {
  "信箱": "電子信箱",
  "平常專注時是否\n有分心的情況": "分心",
  "是否有用過幫助專注的 App\n例如：flora, forest, 番茄鐘...等": "用過專注App",
  "平日/假日預計會使用 App 的時間 [平日]": "平日使用時間",
  "平日/假日預計會使用 App 的時間 [假日]": "假日使用時間",
  "預計使用 App 時會專注的項目 \n(例如：線性代數、英文、繪畫...等)": "預計專注項目",
  "Apple ID (與 iPhone 綁定之信箱)": "Apple ID",
  "可以至清大台達館/google meet\n聽取實驗說明的日期": "說明日期"
}

function App() {
  const [participantData, setPrticipantData] = useState({
    columns: [],
    rows: []
  });
  const [groupData, setGroupData] = useState({
    columns: [],
    rows: []
  });
  const [fallback, setFallback] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [focusDrinkId, setFocusDrinkId] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  // const backgroungImgUrl = "https://i.imgur.com/SDLzr35.jpg"; QWQ

  useEffect(() => {
    AOS.init({
      duration: 2000
    });

    getParticipants()
      .then(payload => {
        console.log(payload);
        let columns = [];
        for (let header of payload.headerValues) {
          columns.push(header === "照片" ? {
            Header: header in headerAbbrs ? headerAbbrs[header] : header,
            accessor: header, // accessor is the "key" in the data
            maxWidth: 70,
            minWidth: 70,
            Cell: ({ cell: { value } }) => (
              <img
                src={value.replace("open?id=", "thumbnail?authuser=0&sz=w320&id=")}
                width={60}
              />
            )
          } : {
            Header: header in headerAbbrs ? headerAbbrs[header] : header,
            accessor: header, // accessor is the "key" in the data
          })
        }
        setPrticipantData({
          columns,
          rows: payload.rows
        });
      })
      .catch((error) => {
        console.log(error);
        //   setFallback(true);
      })
    // .finally(()=>{
    //   setTimeout(()=>{
    //     if(window._jf) window._jf.flush();
    //   }, 500);
    // })

    getParticipantGroups()
      .then(payload => {
        console.log(payload);
        let columns = [];
        for (let header of payload.headerValues) {
          columns.push(header === "照片" ? {
            Header: header in headerAbbrs ? headerAbbrs[header] : header,
            accessor: header, // accessor is the "key" in the data
            maxWidth: 70,
            minWidth: 70,
            Cell: ({ cell: { value } }) => (
              <img
                src={value.replace("open?id=", "thumbnail?authuser=0&sz=w320&id=")}
                width={60}
              />
            )
          } : {
            Header: header in headerAbbrs ? headerAbbrs[header] : header,
            accessor: header, // accessor is the "key" in the data
          })
        }
        setGroupData({
          columns,
          rows: payload.rows
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    // let backImg = new Image();
    // backImg.src = backgroungImgUrl;
    // backImg.onload = () => {
    //     setShowBackground(true);
    // };
  }, []);

  const appContext = {
    participantData,
    groupData,
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
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Redirect
                  to={{ pathname: "/participants" }}
                />
              </Route>
              <Route path="/participants">
                <ParticipantList />
              </Route>
              <Route path="/groups">
                <GroupSetting />
              </Route>
              <Route path="/events">
                <IconContext.Provider value={{size: "0.75rem", color: "rgba(0,0,0,0.7)"}}>
                  <EventView />
                </IconContext.Provider>
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
      {/* <footer className="bd-footer p-3 mt-5 bg-light text-center text-sm-start">
      <div className="container">
        <ul className="bd-footer-links ps-0 mb-3">
          <li className="d-inline-block"><a href="https://github.com/jackraken/datalab-drinks-frontend">GitHub</a></li>
        </ul>
        <p className="mb-0">Designed and built with all the love in the world by the <a href="http://www.cs.nthu.edu.tw/~shwu/">Datalab</a> with the help of <a href="https://www.camacafe.com/">cama coffee</a>(03)571-1500.</p>
      </div>
    </footer> */}
    </AppContext.Provider>
  );
}

export default App;
