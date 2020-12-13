import * as axios from 'axios';
import {put, all, call, takeEvery} from 'redux-saga/effects'

const IS_LOADING = 'IS_LOADING'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILED = 'FETCH_FAILED'
const UPDATE_VERSION = 'UPDATE_VERSION'
const SHOW_AUTHOR = 'SHOW_AUTHOR'

const URL = 'https://dog.ceo/api/breeds/image/random'
let initialState = {
    url: '',
    isLoading: false,
    errorLoading: false,
    info: {title: 1},
    author: ''
}

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                url: action.img
            }
        }
        case FETCH_FAILED: {
            return {
                ...state,
                isLoading: false,
                errorLoading: true
            }
        }
        case UPDATE_VERSION: {
            console.log(state.info)
            return {
                ...state,
                info: {
                    ...state.info,
                    title: state.info.title + 1
                }
            }
        }
        case SHOW_AUTHOR: {
            return {
                ...state,
                author: action.payload
            }
        }
        default:
            return state
    }
}

const isLoading = () => ({type: IS_LOADING})
const getImg = (img) => ({type: FETCH_SUCCESS, img})
const error = () => ({type: FETCH_FAILED})

export const updateVersion = () => ({type: UPDATE_VERSION})
export const showAuthor = (payload) => ({type: SHOW_AUTHOR, payload})

function* fetchHandler() {
    try {
        yield put(isLoading())
        let img = yield call(() => axios.get(URL).then(response => response.data.message))
        yield put(getImg(img))
    } catch (err) {
        yield put(error())
    }
}

function* watchFetchHandler() {
    yield takeEvery('FETCH_ASYNC', fetchHandler)
}

export default function* rootSaga() {
    yield all([
        watchFetchHandler()
    ])
}