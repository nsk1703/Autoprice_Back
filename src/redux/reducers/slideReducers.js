import {slideConstants} from '../../constants/slideConstants'

export const slidesReducer = (state = { slides: [] }, action) => {
    switch (action.type) {
        case slideConstants.ALL_SLIDES_REQUEST:
        case slideConstants.ADMIN_SLIDES_REQUEST:
            return {
                loading: true,
                slides: []
            }

        case slideConstants.ALL_SLIDES_SUCCESS:
            return {
                loading: false,
                slides: action.payload.slides,
                slidesCount: action.payload.slidesCount,
                // resPerPage: action.payload.resPerPage,
                // filteredslidesCount: action.payload.filteredslidesCount
            }

        case slideConstants.ADMIN_SLIDES_SUCCESS:
            return {
                loading: false,
                slides: action.payload
            }

        case slideConstants.ALL_SLIDES_FAIL:
        case slideConstants.ADMIN_SLIDES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case slideConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newSlideReducer = (state = { slide: {} }, action) => {
    switch (action.type) {

        case slideConstants.NEW_SLIDE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case slideConstants.NEW_SLIDE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                // slide: action.payload.slide
            }

        case slideConstants.NEW_SLIDE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case slideConstants.NEW_SLIDE_RESET:
            return {
                ...state,
                success: false
            }

        case slideConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const slideReducer = (state = {}, action) => {
    switch (action.type) {

        case slideConstants.DELETE_SLIDE_REQUEST:
        case slideConstants.UPDATE_SLIDE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case slideConstants.DELETE_SLIDE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case slideConstants.UPDATE_SLIDE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case slideConstants.DELETE_SLIDE_FAIL:
        case slideConstants.UPDATE_SLIDE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case slideConstants.DELETE_SLIDE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case slideConstants.UPDATE_SLIDE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case slideConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const slideDetailsReducer = (state = { slide: {} }, action) => {
    switch (action.type) {

        case slideConstants.SLIDE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case slideConstants.SLIDE_DETAILS_SUCCESS:
            return {
                loading: false,
                slide: action.payload
            }

        case slideConstants.SLIDE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case slideConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}