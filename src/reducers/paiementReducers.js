import {
    ALL_PAIEMENT_REQUEST,
    ALL_PAIEMENT_SUCCESS,
    ALL_PAIEMENT_FAIL,
    ADMIN_PAIEMENT_REQUEST,
    ADMIN_PAIEMENT_SUCCESS,
    ADMIN_PAIEMENT_FAIL,
    NEW_PAIEMENT_REQUEST,
    NEW_PAIEMENT_SUCCESS,
    NEW_PAIEMENT_RESET,
    NEW_PAIEMENT_FAIL,
    DELETE_PAIEMENT_REQUEST,
    DELETE_PAIEMENT_SUCCESS,
    DELETE_PAIEMENT_RESET,
    DELETE_PAIEMENT_FAIL,
    UPDATE_PAIEMENT_REQUEST,
    UPDATE_PAIEMENT_SUCCESS,
    UPDATE_PAIEMENT_RESET,
    UPDATE_PAIEMENT_FAIL,
    PAIEMENT_DETAILS_REQUEST,
    PAIEMENT_DETAILS_SUCCESS,
    PAIEMENT_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/paiementConstants'

export const paiementsReducer = (state = { paiements: [] }, action) => {
    switch (action.type) {
        case ALL_PAIEMENT_REQUEST:
        case ADMIN_PAIEMENT_REQUEST:
            return {
                loading: true,
                paiements: []
            }

        case ALL_PAIEMENT_SUCCESS:
            return {
                loading: false,
                paiements: action.payload.paiements,
                paiementsCount: action.payload.paiementsCount,
                resPerPage: action.payload.resPerPage,
                filteredpaiementsCount: action.payload.filteredpaiementsCount
            }

        case ADMIN_PAIEMENT_SUCCESS:
            return {
                loading: false,
                paiements: action.payload
            }

        case ALL_PAIEMENT_FAIL:
        case ADMIN_PAIEMENT_FAIL:
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

export const newPaiementReducer = (state = { paiement: {} }, action) => {
    switch (action.type) {

        case NEW_PAIEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PAIEMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                paiement: action.payload.paiement
            }

        case NEW_PAIEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PAIEMENT_RESET:
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

export const paiementReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PAIEMENT_REQUEST:
        case UPDATE_PAIEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PAIEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PAIEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_PAIEMENT_FAIL:
        case UPDATE_PAIEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PAIEMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PAIEMENT_RESET:
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

export const paiementDetailsReducer = (state = { paiement: {} }, action) => {
    switch (action.type) {

        case PAIEMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PAIEMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                paiement: action.payload
            }

        case PAIEMENT_DETAILS_FAIL:
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