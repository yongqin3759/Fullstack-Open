import React from "react";

const Notification = ({isGood, message})=>{
    if (message === null) {
        return null
    }

    const commonStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 1,
        padding: 10,
        marginBottom: 10,
        width:'max-content',
    }
    const error = {
        color: 'red',
    }
    const success = {
        color: 'green',
    }

    let status = isGood? success: error

    return (
        <div style={{...commonStyle,...status}}>
        {message}
        </div>
    )
}
export default Notification