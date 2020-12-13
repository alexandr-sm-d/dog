import React, {memo, useEffect} from 'react'
import {connect, useSelector} from "react-redux";
import {showAuthor, updateVersion} from "./redux-saga/reducer";

const Info = (props) => {
    debugger
    const author = 'Alexandr'

    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app: version {props.title}
            <div>
                <button onClick={() => props.updateVersion()}>Update version</button>
                <button onClick={() => props.showAuthor(author)}>Show Author</button>
                <div>
                    Author : {props.author}
                </div>
            </div>
        </div>
    )
}

// export default Info
const mstp = state => ({
    title: state.fetchStatus.info.title,
    author: state.fetchStatus.author
})

// function mdtp(dispatch) {
//     return {
//         updateVersion: function () {
//             dispatch(updateVersion())
//         }
//     }
// }

const mdtp = dispatch => ({
    updateVersion: () => dispatch(updateVersion()),
    showAuthor: (payload) => dispatch(showAuthor(payload))
})

export default connect(mstp, mdtp)(Info)