import { maintenanceConstants } from '../../constants/maintenanceConstants'

export const maintenancesReducer = (state = { maintenances: [] }, action) => {
    switch (action.type) {
        case maintenanceConstants.ALL_MAINTENANCE_REQUEST:
        case maintenanceConstants.ADMIN_MAINTENANCE_REQUEST:
            return {
                loading: true,
                maintenances: []
            }

        case maintenanceConstants.ALL_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                maintenances: action.payload.maintenances,
                maintenancesCount: action.payload.maintenancesCount,
                // resPerPage: action.payload.resPerPage,
                // filteredmaintenancesCount: action.payload.filteredmaintenancesCount
            }

        case maintenanceConstants.ADMIN_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                maintenances: action.payload
            }

        case maintenanceConstants.ALL_MAINTENANCE_FAIL:
        case maintenanceConstants.ADMIN_MAINTENANCE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case maintenanceConstants.CLEAR_ERRORS:
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

        case maintenanceConstants.NEW_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case maintenanceConstants.NEW_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                maintenance: action.payload.maintenance
            }

        case maintenanceConstants.NEW_MAINTENANCE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case maintenanceConstants.NEW_MAINTENANCE_RESET:
            return {
                ...state,
                success: false
            }

        case maintenanceConstants.CLEAR_ERRORS:
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

        case maintenanceConstants.DELETE_MAINTENANCE_REQUEST:
        case maintenanceConstants.UPDATE_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case maintenanceConstants.DELETE_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case maintenanceConstants.UPDATE_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case maintenanceConstants.DELETE_MAINTENANCE_FAIL:
        case maintenanceConstants.UPDATE_MAINTENANCE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case maintenanceConstants.DELETE_MAINTENANCE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case maintenanceConstants.UPDATE_MAINTENANCE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case maintenanceConstants.CLEAR_ERRORS:
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

        case maintenanceConstants.MAINTENANCE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case maintenanceConstants.MAINTENANCE_DETAILS_SUCCESS:
            return {
                loading: false,
                maintenance: action.payload
            }

        case maintenanceConstants.MAINTENANCE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case maintenanceConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}