import React, {useEffect} from 'react'
import {connect, shallowEqual, useSelector} from "react-redux";
import {fetchHandler} from "./redux-thunk/reducer";
import Info from "./Info";

const App = (props) => {
    useEffect(() => console.log('render App'))

    const title = useSelector(state => state.fetchStatus.info.title)

    return (
        <div>
            <button onClick={() => props.fetchDogHandler()}>fetch Dog</button>
            {props.isLoading
                ? <p>is loading...</p>
                : props.isError
                    ? <h1>Some error</h1>
                    : <div>
                        <img src={props.url} alt=""/>
                    </div>
            }
            <Info
                title={title}
            />
        </div>
    )
};

const mapStateToProps = state => {
    // console.log(state)
    return {
        isLoading: state.fetchStatus.isLoading,
        isError: state.fetchStatus.errorLoading,
        url: state.fetchStatus.url
    }
}

//  REDUX-THUNK
// const mapStateDispatchToProps = dispatch => {
//     return {
//         fetchDogHandler: () => dispatch(fetchHandler())
//     }
// }


//  REDUX-SAGA
const mapStateDispatchToProps = dispatch => {
    return {
        fetchDogHandler: () => dispatch(fetchAsync())
    }
}

const fetchAsync = () => ({type: 'FETCH_ASYNC'})

export default connect(mapStateToProps, mapStateDispatchToProps)(App)


