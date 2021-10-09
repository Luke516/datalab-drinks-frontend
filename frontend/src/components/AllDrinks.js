import React, { useEffect, useContext } from "react";
import DrinkSection from "../components/DrinkSection";
import { useLocation, useParams } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { AppContext } from "../App";
import "./AllDrink.css";

export default function AllDrinks(props) {
    const appContext = useContext(AppContext);
    const {drinkData, showSuccessModal, setShowSuccessModal} = appContext;

    let location = useLocation();
    let param = useParams();

    const nodeRef = React.useRef(null)

    useEffect(()=>{
        setTimeout(()=>{
            window._jf.flush();
        }, 500)
    }, []);

    return(
        <React.Fragment>
            <div className="container tab-content" data-aos="fade-in" data-aos-duration="300" id="nav-tabContent">
            {drinkData && drinkData.menu &&
                drinkData.menu.map((series, key) => {
                    return (
                        (param.series == key || param.series == "all")?
                        <div key={key} className={"tab-panefadeactiveshow"} id={"drink" + key} role="tabpanel" aria-labelledby={`drink-${key}-tab`}>
                            <DrinkSection series={series} />
                        </div>:
                        <div key={key}></div>
                    )
                })
            }
            </div>
            <CSSTransition nodeRef={nodeRef} in={showSuccessModal} timeout={2000} classNames={"success-modal"}>
                <div className="w-100 justify-content-center success-modal"ref={nodeRef}>
                    <Alert className="m-0 px-4 text-center">
                        <span>訂購成功 ᵔᴥᵔ</span>
                        <span className="mx-3"/>
                        <div className="btn btn-primary" onClick={()=>{setShowSuccessModal(false)}}>
                            OK
                        </div>
                    </Alert>
                </div>
            </CSSTransition>
        </React.Fragment>
        
    )
}