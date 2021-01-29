import React, { useState } from "react";

export default function SingleOptionButtonGroup(props) {
    return(
        <div className="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
            {props.options.map((option, key)=>{
                return(
                    <>
                        <input type="radio" className="btn-check" name={`btn-radio-${props.title}`} id={`btn-radio-${props.title}-${key}`} autocomplete="off" />
                        <label className="btn btn-outline-primary" for={`btn-radio-${props.title}-${key}`} >
                            {option}
                        </label>
                        {/* <button key={key} type="button" class={"btn btn-outline-primary"} onClick={()=>{props.onChange(option)}}>
                            {option}
                        </button> */}
                    </>
                )
            })}
        </div>
    )
}