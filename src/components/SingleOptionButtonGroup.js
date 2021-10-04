import React from "react";

export default function SingleOptionButtonGroup(props) {
    return(
        <div className="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
            {props.options.map((option, key)=>{
                return(
                    <React.Fragment key={key}>
                        <input type="radio" className="btn-check" name={`btn-radio-${props.title}-${props.id}`} id={`btn-radio-${props.title}-${props.id}-${key}`} autoComplete="off" onClick={()=>{props.onChange(props.values? props.values[key]: option); console.log(option)}}/>
                        <label className="btn btn-outline-primary" htmlFor={`btn-radio-${props.title}-${props.id}-${key}`} >
                            {option}
                        </label>
                    </React.Fragment>
                )
            })}
        </div>
    )
}