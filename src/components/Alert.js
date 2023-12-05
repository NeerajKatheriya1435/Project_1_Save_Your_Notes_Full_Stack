import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if(word==="danger"){
            word="error"
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: "55px" }}>
            {props.alert && <div>
                <div className={`alert alert-${props.alert.type1} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type1)}</strong>: {props.alert.msg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>}
        </div>
    )
}