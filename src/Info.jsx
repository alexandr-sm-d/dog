import React, {memo, useEffect} from 'react'
import {connect, useDispatch, useSelector} from "react-redux";
import {showAuthor, showAuthorTA, updateVersion, updateVersionTA} from "./redux-saga/reducer";

const Info = (props) => {
    const author = 'Alexandr'

    const dispatch = useDispatch()

    useEffect(() => console.log('render Info'))

    return (
        <div>
            <hr/>
            Info about app: version {props.title}
            <div>
                <button onClick={() => dispatch(updateVersionTA())}>Update version</button>
                <button onClick={() => dispatch(showAuthor(author))}>Show Author</button>
                {/*<button onClick={() => dispatch(showAuthorTA(author))}>Show Author</button>*/}
                <div>
                    Author : {props.author}
                </div>
            </div>
        </div>
    )
}

export default Info


// const mstp = state => ({
//     title: state.fetchStatus.info.title,
//     author: state.fetchStatus.author
// })

// function mdtp(dispatch) {
//     return {
//         updateVersion: function () {
//             dispatch(updateVersion())
//         }
//     }
// }

// const mdtp = dispatch => ({
//     updateVersion: () => dispatch(updateVersion()),
//     showAuthor: (payload) => dispatch(showAuthor(payload))
// })

// export default connect(mstp, mdtp)(Info)
// export default connect(mstp)(Info)