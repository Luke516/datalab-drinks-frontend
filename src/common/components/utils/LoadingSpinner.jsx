import React from "react";
import styles from "./LoadingSpinner.module.css";

// TODO: import css
export default function LoadingSpinner(props) {
    return <div className="d-flex justify-content-center">
        <div className={ styles["lds-spinner"] + " " + (props.size ? props.size : "")}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>;
}