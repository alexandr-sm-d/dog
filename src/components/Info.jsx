import React from 'react'
import {useDispatch} from "react-redux";
import {showAuthorTA, updateVersionTA} from "../store/reducer";

const Info = (props) => {
    const dispatch = useDispatch()

    const author = 'Alexandr'

    return (
        <div>
            <hr/>
            Info about app: version {props.title}
            <div>
                <button onClick={() => dispatch(updateVersionTA())}>Update version</button>
                <button onClick={() => dispatch(showAuthorTA(author))}>Show Author</button>
                <div>
                    Author : {props.author}
                </div>
            </div>
        </div>
    )
}

export default Info