import React from 'react'
import {connect, useSelector} from "react-redux";
import Info from "./Info";


const App = (props) => {
    const getTitle = state => {
        console.log('launch getTitle selector')
        return state.fetchStatus.info.title
    }

    const title = useSelector(getTitle)
    const author = useSelector(state => state.fetchStatus.author)

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
                author={author}
            />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isLoading: state.fetchStatus.isLoading,
        isError: state.fetchStatus.errorLoading,
        url: state.fetchStatus.url
    }
}


const mapStateDispatchToProps = dispatch => {
    return {
        fetchDogHandler: () => dispatch(fetchAsync())
    }
}

const fetchAsync = () => ({type: 'FETCH_ASYNC'})

export default connect(mapStateToProps, mapStateDispatchToProps)(App)


