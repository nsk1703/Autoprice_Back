import {
    ALL_APPROPRODUIT_REQUEST,
    ALL_APPROPRODUIT_SUCCESS,
    ALL_APPROPRODUIT_FAIL,
    ADMIN_APPROPRODUIT_REQUEST,
    ADMIN_APPROPRODUIT_SUCCESS,
    ADMIN_APPROPRODUIT_FAIL,
    NEW_APPROPRODUIT_REQUEST,
    NEW_APPROPRODUIT_SUCCESS,
    NEW_APPROPRODUIT_RESET,
    NEW_APPROPRODUIT_FAIL,
    DELETE_APPROPRODUIT_REQUEST,
    DELETE_APPROPRODUIT_SUCCESS,
    DELETE_APPROPRODUIT_RESET,
    DELETE_APPROPRODUIT_FAIL,
    UPDATE_APPROPRODUIT_REQUEST,
    UPDATE_APPROPRODUIT_SUCCESS,
    UPDATE_APPROPRODUIT_RESET,
    UPDATE_APPROPRODUIT_FAIL,
    APPROPRODUIT_DETAILS_REQUEST,
    APPROPRODUIT_DETAILS_SUCCESS,
    APPROPRODUIT_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../../constants/approproduitConstants'

export const approproduitsReducer = (state = { approproduits: [] }, action) => {
    switch (action.type) {
        case ALL_APPROPRODUIT_REQUEST:
        case ADMIN_APPROPRODUIT_REQUEST:
            return {
                loading: true,
                approproduits: []
            }

        case ALL_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                approproduits: action.payload.approproduits,
                approproduitsCount: action.payload.approproduitsCount,
                resPerPage: action.payload.resPerPage,
                filteredapproproduitsCount: action.payload.filteredapproproduitsCount
            }

        case ADMIN_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                approproduits: action.payload
            }

        case ALL_APPROPRODUIT_FAIL:
        case ADMIN_APPROPRODUIT_FAIL:
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

export const newApproproduitReducer = (state = { approproduit: {} }, action) => {
    switch (action.type) {

        case NEW_APPROPRODUIT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_APPROPRODUIT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                approproduit: action.payload.approproduit
            }

        case NEW_APPROPRODUIT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_APPROPRODUIT_RESET:
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

export const approproduitReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_APPROPRODUIT_REQUEST:
        case UPDATE_APPROPRODUIT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_APPROPRODUIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_APPROPRODUIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_APPROPRODUIT_FAIL:
        case UPDATE_APPROPRODUIT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_APPROPRODUIT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_APPROPRODUIT_RESET:
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

export const approproduitDetailsReducer = (state = { approproduit: {} }, action) => {
    switch (action.type) {

        case APPROPRODUIT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case APPROPRODUIT_DETAILS_SUCCESS:
            return {
                loading: false,
                approproduit: action.payload
            }

        case APPROPRODUIT_DETAILS_FAIL:
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