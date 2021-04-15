import {
    ALL_APPROMONNAIE_REQUEST,
    ALL_APPROMONNAIE_SUCCESS,
    ALL_APPROMONNAIE_FAIL,
    ADMIN_APPROMONNAIE_REQUEST,
    ADMIN_APPROMONNAIE_SUCCESS,
    ADMIN_APPROMONNAIE_FAIL,
    NEW_APPROMONNAIE_REQUEST,
    NEW_APPROMONNAIE_SUCCESS,
    NEW_APPROMONNAIE_RESET,
    NEW_APPROMONNAIE_FAIL,
    DELETE_APPROMONNAIE_REQUEST,
    DELETE_APPROMONNAIE_SUCCESS,
    DELETE_APPROMONNAIE_RESET,
    DELETE_APPROMONNAIE_FAIL,
    UPDATE_APPROMONNAIE_REQUEST,
    UPDATE_APPROMONNAIE_SUCCESS,
    UPDATE_APPROMONNAIE_RESET,
    UPDATE_APPROMONNAIE_FAIL,
    APPROMONNAIE_DETAILS_REQUEST,
    APPROMONNAIE_DETAILS_SUCCESS,
    APPROMONNAIE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../../constants/appromonnaieConstants'

export const appromonnaiesReducer = (state = { appromonnaies: [] }, action) => {
    switch (action.type) {
        case ALL_APPROMONNAIE_REQUEST:
        case ADMIN_APPROMONNAIE_REQUEST:
            return {
                loading: true,
                appromonnaies: []
            }

        case ALL_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                appromonnaies: action.payload.appromonnaies,
                appromonnaiesCount: action.payload.appromonnaiesCount,
                resPerPage: action.payload.resPerPage,
                filteredappromonnaiesCount: action.payload.filteredappromonnaiesCount
            }

        case ADMIN_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                appromonnaies: action.payload
            }

        case ALL_APPROMONNAIE_FAIL:
        case ADMIN_APPROMONNAIE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newAppromonnaieReducer = (state = { appromonnaie: {} }, action) => {
    switch (action.type) {

        case NEW_APPROMONNAIE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                appromonnaie: action.payload.appromonnaie
            }

        case NEW_APPROMONNAIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_APPROMONNAIE_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const appromonnaieReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_APPROMONNAIE_REQUEST:
        case UPDATE_APPROMONNAIE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_APPROMONNAIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_APPROMONNAIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_APPROMONNAIE_FAIL:
        case UPDATE_APPROMONNAIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_APPROMONNAIE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_APPROMONNAIE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const appromonnaieDetailsReducer = (state = { appromonnaie: {} }, action) => {
    switch (action.type) {

        case APPROMONNAIE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case APPROMONNAIE_DETAILS_SUCCESS:
            return {
                loading: false,
                appromonnaie: action.payload
            }

        case APPROMONNAIE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}