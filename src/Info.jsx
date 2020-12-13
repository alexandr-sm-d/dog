import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";
import {updateVersion} from "./redux-saga/reducer";

const Info = (props) => {
    console.log('props info', props)
    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app: version {props.title}
            <div>
                <button onClick={() => props.updateVersion()}>Update version</button>
            </div>
        </div>
    )
}

// export default Info
const mstp = state => ({title: state.fetchStatus.info.title})

function mdtp(dispatch) {
    return {
        updateVersion: function () {
            dispatch(updateVersion())
        }
    }
}

export default connect(mstp, mdtp)(Info)