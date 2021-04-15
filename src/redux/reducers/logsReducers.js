import {
    ALL_LOGS_REQUEST,
    ALL_LOGS_SUCCESS,
    ALL_LOGS_FAIL,
    ADMIN_LOGS_REQUEST,
    ADMIN_LOGS_SUCCESS,
    ADMIN_LOGS_FAIL,
    NEW_LOGS_REQUEST,
    NEW_LOGS_SUCCESS,
    NEW_LOGS_RESET,
    NEW_LOGS_FAIL,
    DELETE_LOGS_REQUEST,
    DELETE_LOGS_SUCCESS,
    DELETE_LOGS_RESET,
    DELETE_LOGS_FAIL,
    UPDATE_LOGS_REQUEST,
    UPDATE_LOGS_SUCCESS,
    UPDATE_LOGS_RESET,
    UPDATE_LOGS_FAIL,
    LOGS_DETAILS_REQUEST,
    LOGS_DETAILS_SUCCESS,
    LOGS_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../../constants/logsConstants'

export const logssReducer = (state = { logss: [] }, action) => {
    switch (action.type) {
        case ALL_LOGS_REQUEST:
        case ADMIN_LOGS_REQUEST:
            return {
                loading: true,
                logss: []
            }

        case ALL_LOGS_SUCCESS:
            return {
                loading: false,
                logss: action.payload.logss,
                logssCount: action.payload.logssCount,
                resPerPage: action.payload.resPerPage,
                filteredlogssCount: action.payload.filteredlogssCount
            }

        case ADMIN_LOGS_SUCCESS:
            return {
                loading: false,
                logss: action.payload
            }

        case ALL_LOGS_FAIL:
        case ADMIN_LOGS_FAIL:
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

export const newLogsReducer = (state = { logs: {} }, action) => {
    switch (action.type) {

        case NEW_LOGS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_LOGS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                logs: action.payload.logs
            }

        case NEW_LOGS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_LOGS_RESET:
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

export const logsReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_LOGS_REQUEST:
        case UPDATE_LOGS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_LOGS_FAIL:
        case UPDATE_LOGS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_LOGS_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_LOGS_RESET:
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

export const logsDetailsReducer = (state = { logs: {} }, action) => {
    switch (action.type) {

        case LOGS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case LOGS_DETAILS_SUCCESS:
            return {
                loading: false,
                logs: action.payload
            }

        case LOGS_DETAILS_FAIL:
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