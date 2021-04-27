import {paiementsConstants} from '../../constants/paiementConstants'

export const paiementsReducer = (state = { paiements: [] }, action) => {
    switch (action.type) {
        case paiementsConstants.ALL_PAIEMENTS_REQUEST:
        case paiementsConstants.ADMIN_PAIEMENT_REQUEST:
            return {
                loading: true,
                paiements: []
            }

        case paiementsConstants.ALL_PAIEMENTS_SUCCESS:
            return {
                loading: false,
                paiements: action.payload.paiements,
                paiementsCount: action.payload.paiementsCount,
            }

        case paiementsConstants.ADMIN_PAIEMENT_SUCCESS:
            return {
                loading: false,
                paiements: action.payload
            }

        case paiementsConstants.ALL_PAIEMENTS_FAIL:
        case paiementsConstants.ADMIN_PAIEMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case paiementsConstants.CLEAR_ERRORS:
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

        case paiementsConstants.NEW_PAIEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case paiementsConstants.NEW_PAIEMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                paiement: action.payload.paiement
            }

        case paiementsConstants.NEW_PAIEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case paiementsConstants.NEW_PAIEMENT_RESET:
            return {
                ...state,
                success: false
            }

        case paiementsConstants.CLEAR_ERRORS:
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

        case paiementsConstants.DELETE_PAIEMENT_REQUEST:
        case paiementsConstants.UPDATE_PAIEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case paiementsConstants.DELETE_PAIEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case paiementsConstants.UPDATE_PAIEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case paiementsConstants.DELETE_PAIEMENT_FAIL:
        case paiementsConstants.UPDATE_PAIEMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case paiementsConstants.DELETE_PAIEMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case paiementsConstants.UPDATE_PAIEMENT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case paiementsConstants.CLEAR_ERRORS:
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

        case paiementsConstants.PAIEMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case paiementsConstants.PAIEMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                paiement: action.payload
            }

        case paiementsConstants.PAIEMENT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case paiementsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}