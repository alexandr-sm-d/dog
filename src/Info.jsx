import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";

const Info = ({info}) => {
    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app: {info.title}
        </div>
    )
}

export default Info