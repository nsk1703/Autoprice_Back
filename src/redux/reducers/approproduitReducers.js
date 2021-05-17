import { approproduitConstants } from '../../constants/approproduitConstants'

export const approproduitsReducer = (state = { approproduits: [] }, action) => {
    switch (action.type) {
        case approproduitConstants.ALL_APPROPRODUIT_REQUEST:
        case approproduitConstants.ADMIN_APPROPRODUIT_REQUEST:
            return {
                loading: true,
                approproduits: []
            }

        case approproduitConstants.ALL_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                approproduits: action.payload.approproduits,
                approproduitsCount: action.payload.approproduitsCount,
                // resPerPage: action.payload.resPerPage,
                // filteredapproproduitsCount: action.payload.filteredapproproduitsCount
            }

        case approproduitConstants.ADMIN_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                approproduits: action.payload
            }

        case approproduitConstants.ALL_APPROPRODUIT_FAIL:
        case approproduitConstants.ADMIN_APPROPRODUIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case approproduitConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newApproproduitReducer = (state = { approproduit: {} }, action) => {
    switch (action.type) {

        case approproduitConstants.NEW_APPROPRODUIT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case approproduitConstants.NEW_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                // approproduit: action.payload.approproduit
            }

        case approproduitConstants.NEW_APPROPRODUIT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case approproduitConstants.NEW_APPROPRODUIT_RESET:
            return {
                ...state,
                success: false
            }

        case approproduitConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const approproduitReducer = (state = {}, action) => {
    switch (action.type) {

        case approproduitConstants.DELETE_APPROPRODUIT_REQUEST:
        case approproduitConstants.UPDATE_APPROPRODUIT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case approproduitConstants.DELETE_APPROPRODUIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case approproduitConstants.UPDATE_APPROPRODUIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case approproduitConstants.DELETE_APPROPRODUIT_FAIL:
        case approproduitConstants.UPDATE_APPROPRODUIT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case approproduitConstants.DELETE_APPROPRODUIT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case approproduitConstants.UPDATE_APPROPRODUIT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case approproduitConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const approproduitDetailsReducer = (state = { approproduit: {} }, action) => {
    switch (action.type) {

        case approproduitConstants.APPROPRODUIT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case approproduitConstants.APPROPRODUIT_DETAILS_SUCCESS:
            return {
                loading: false,
                approproduit: action.payload
            }

        case approproduitConstants.APPROPRODUIT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case approproduitConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}