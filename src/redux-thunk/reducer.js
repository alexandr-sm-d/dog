import * as axios from 'axios';

const IS_LOADING = 'IS_LOADING'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILED = 'FETCH_FAILED'

const URL = 'https://dog.ceo/api/breeds/image/random'
let initialState = {
    url: '',
    isLoading: false,
    errorLoading: false
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
        default:
            return state
    }
}

const isLoading = () => ({type: IS_LOADING})
const getImg = (img) => ({type: FETCH_SUCCESS, img})
const error = () => ({type: FETCH_FAILED})

export const fetchHandler = () => async (dispatch) => {
    try {
        dispatch(isLoading())
        let response = await axios.get(URL)
        dispatch(getImg(response.data.message))
    } catch (err) {
        dispatch(error())
    }
}