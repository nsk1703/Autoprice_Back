import {
    ALL_REMBOURSEMENT_REQUEST,
    ALL_REMBOURSEMENT_SUCCESS,
    ALL_REMBOURSEMENT_FAIL,
    ADMIN_REMBOURSEMENT_REQUEST,
    ADMIN_REMBOURSEMENT_SUCCESS,
    ADMIN_REMBOURSEMENT_FAIL,
    NEW_REMBOURSEMENT_REQUEST,
    NEW_REMBOURSEMENT_SUCCESS,
    NEW_REMBOURSEMENT_RESET,
    NEW_REMBOURSEMENT_FAIL,
    DELETE_REMBOURSEMENT_REQUEST,
    DELETE_REMBOURSEMENT_SUCCESS,
    DELETE_REMBOURSEMENT_RESET,
    DELETE_REMBOURSEMENT_FAIL,
    UPDATE_REMBOURSEMENT_REQUEST,
    UPDATE_REMBOURSEMENT_SUCCESS,
    UPDATE_REMBOURSEMENT_RESET,
    UPDATE_REMBOURSEMENT_FAIL,
    REMBOURSEMENT_DETAILS_REQUEST,
    REMBOURSEMENT_DETAILS_SUCCESS,
    REMBOURSEMENT_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../../constants/remboursementConstants'

export const remboursementsReducer = (state = { remboursements: [] }, action) => {
    switch (action.type) {
        case ALL_REMBOURSEMENT_REQUEST:
        case ADMIN_REMBOURSEMENT_REQUEST:
            return {
                loading: true,
                remboursements: []
            }

        case ALL_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                remboursements: action.payload.remboursements,
                remboursementsCount: action.payload.remboursementsCount
            }

        case ADMIN_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                remboursements: action.payload
            }

        case ALL_REMBOURSEMENT_FAIL:
        case ADMIN_REMBOURSEMENT_FAIL:
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

export const newRemboursementReducer = (state = { remboursement: {} }, action) => {
    switch (action.type) {

        case NEW_REMBOURSEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REMBOURSEMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                remboursement: action.payload.remboursement
            }

        case NEW_REMBOURSEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REMBOURSEMENT_RESET:
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

export const remboursementReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REMBOURSEMENT_REQUEST:
        case UPDATE_REMBOURSEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REMBOURSEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_REMBOURSEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_REMBOURSEMENT_FAIL:
        case UPDATE_REMBOURSEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REMBOURSEMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_REMBOURSEMENT_RESET:
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

export const remboursementDetailsReducer = (state = { remboursement: {} }, action) => {
    switch (action.type) {

        case REMBOURSEMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case REMBOURSEMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                remboursement: action.payload
            }

        case REMBOURSEMENT_DETAILS_FAIL:
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