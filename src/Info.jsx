import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";

const Info = (props) => {
    console.log('props info', props)
    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app: {props.title}
        </div>
    )
}

export default Info

// export default connect((state) => ({
//     title: state.fetchStatus.info.title
// }))(Info)