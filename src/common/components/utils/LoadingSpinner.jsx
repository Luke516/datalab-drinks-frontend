import React from 'react'

// TODO: import css
export default function LoadingSpinner(props) {
    return <div className="d-flex justify-content-center"><div className={"lds-spinner " + (props.size? props.size: "")}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>;
}