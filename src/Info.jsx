import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";

const Info = () => {
    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app:
        </div>
    )
}

export default Info