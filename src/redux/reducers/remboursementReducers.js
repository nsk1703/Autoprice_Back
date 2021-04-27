import { remboursementConstants } from '../../constants/remboursementConstants'

export const remboursementsReducer = (state = { remboursements: [] }, action) => {
    switch (action.type) {
        case remboursementConstants.ALL_REMBOURSEMENT_REQUEST:
        case remboursementConstants.ADMIN_REMBOURSEMENT_REQUEST:
            return {
                loading: true,
                remboursements: []
            }

        case remboursementConstants.ALL_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                remboursements: action.payload.remboursements,
                remboursementsCount: action.payload.remboursementsCount,
                // resPerPage: action.payload.resPerPage,
                // filteredremboursementsCount: action.payload.filteredremboursementsCount
            }

        case remboursementConstants.ADMIN_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                remboursements: action.payload
            }

        case remboursementConstants.ALL_REMBOURSEMENT_FAIL:
        case remboursementConstants.ADMIN_REMBOURSEMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case remboursementConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newRemboursementReducer = (state = { remboursement: {} }, action) => {
    switch (action.type) {

        case remboursementConstants.NEW_REMBOURSEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case remboursementConstants.NEW_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                remboursement: action.payload.remboursement
            }

        case remboursementConstants.NEW_REMBOURSEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case remboursementConstants.NEW_REMBOURSEMENT_RESET:
            return {
                ...state,
                success: false
            }

        case remboursementConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const remboursementReducer = (state = {}, action) => {
    switch (action.type) {

        case remboursementConstants.DELETE_REMBOURSEMENT_REQUEST:
        case remboursementConstants.UPDATE_REMBOURSEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case remboursementConstants.DELETE_REMBOURSEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case remboursementConstants.UPDATE_REMBOURSEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case remboursementConstants.DELETE_REMBOURSEMENT_FAIL:
        case remboursementConstants.UPDATE_REMBOURSEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case remboursementConstants.DELETE_REMBOURSEMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case remboursementConstants.UPDATE_REMBOURSEMENT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case remboursementConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const remboursementDetailsReducer = (state = { remboursement: {} }, action) => {
    switch (action.type) {

        case remboursementConstants.REMBOURSEMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case remboursementConstants.REMBOURSEMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                remboursement: action.payload
            }

        case remboursementConstants.REMBOURSEMENT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case remboursementConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}