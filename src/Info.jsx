import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";

const Info = () => {
    useEffect(() => console.log('render Info'))

    const info = useSelector(state => state.fetchStatus.info)

    return (
        <div>
            <hr/>
            Info about app: {info.title}
        </div>
    )
}

export default Info