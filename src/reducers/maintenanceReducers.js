import {
    ALL_MAINTENANCE_REQUEST,
    ALL_MAINTENANCE_SUCCESS,
    ALL_MAINTENANCE_FAIL,
    ADMIN_MAINTENANCE_REQUEST,
    ADMIN_MAINTENANCE_SUCCESS,
    ADMIN_MAINTENANCE_FAIL,
    NEW_MAINTENANCE_REQUEST,
    NEW_MAINTENANCE_SUCCESS,
    NEW_MAINTENANCE_RESET,
    NEW_MAINTENANCE_FAIL,
    DELETE_MAINTENANCE_REQUEST,
    DELETE_MAINTENANCE_SUCCESS,
    DELETE_MAINTENANCE_RESET,
    DELETE_MAINTENANCE_FAIL,
    UPDATE_MAINTENANCE_REQUEST,
    UPDATE_MAINTENANCE_SUCCESS,
    UPDATE_MAINTENANCE_RESET,
    UPDATE_MAINTENANCE_FAIL,
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/maintenanceConstants'

export const maintenancesReducer = (state = { maintenances: [] }, action) => {
    switch (action.type) {
        case ALL_MAINTENANCE_REQUEST:
        case ADMIN_MAINTENANCE_REQUEST:
            return {
                loading: true,
                maintenances: []
            }

        case ALL_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                maintenances: action.payload.maintenances,
                maintenancesCount: action.payload.maintenancesCount,
                resPerPage: action.payload.resPerPage,
                filteredmaintenancesCount: action.payload.filteredmaintenancesCount
            }

        case ADMIN_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                maintenances: action.payload
            }

        case ALL_MAINTENANCE_FAIL:
        case ADMIN_MAINTENANCE_FAIL:
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

export const newMaintenanceReducer = (state = { maintenance: {} }, action) => {
    switch (action.type) {

        case NEW_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                maintenance: action.payload.maintenance
            }

        case NEW_MAINTENANCE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_MAINTENANCE_RESET:
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

export const maintenanceReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_MAINTENANCE_REQUEST:
        case UPDATE_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_MAINTENANCE_FAIL:
        case UPDATE_MAINTENANCE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_MAINTENANCE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_MAINTENANCE_RESET:
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

export const maintenanceDetailsReducer = (state = { maintenance: {} }, action) => {
    switch (action.type) {

        case MAINTENANCE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MAINTENANCE_DETAILS_SUCCESS:
            return {
                loading: false,
                maintenance: action.payload
            }

        case MAINTENANCE_DETAILS_FAIL:
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