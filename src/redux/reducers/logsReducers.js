import {logsConstants} from '../../constants/logsConstants'

export const logssReducer = (state = { logss: [] }, action) => {
    switch (action.type) {
        case logsConstants.ALL_LOGS_REQUEST:
        case logsConstants.ADMIN_LOGS_REQUEST:
            return {
                loading: true,
                logss: []
            }

        case logsConstants.ALL_LOGS_SUCCESS:
            return {
                loading: false,
                logss: action.payload.logss,
                logssCount: action.payload.logssCount,
                // resPerPage: action.payload.resPerPage,
                // filteredlogssCount: action.payload.filteredlogssCount
            }

        case logsConstants.ADMIN_LOGS_SUCCESS:
            return {
                loading: false,
                logss: action.payload
            }

        case logsConstants.ALL_LOGS_FAIL:
        case logsConstants.ADMIN_LOGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case logsConstants.CLEAR_ERRORS:
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

        case logsConstants.NEW_LOGS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case logsConstants.NEW_LOGS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                logs: action.payload.logs
            }

        case logsConstants.NEW_LOGS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case logsConstants.NEW_LOGS_RESET:
            return {
                ...state,
                success: false
            }

        case logsConstants.CLEAR_ERRORS:
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

        case logsConstants.DELETE_LOGS_REQUEST:
        case logsConstants.UPDATE_LOGS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case logsConstants.DELETE_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case logsConstants.UPDATE_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case logsConstants.DELETE_LOGS_FAIL:
        case logsConstants.UPDATE_LOGS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case logsConstants.DELETE_LOGS_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case logsConstants.UPDATE_LOGS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case logsConstants.CLEAR_ERRORS:
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

        case logsConstants.LOGS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case logsConstants.LOGS_DETAILS_SUCCESS:
            return {
                loading: false,
                logs: action.payload
            }

        case logsConstants.LOGS_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case logsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}