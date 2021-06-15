import {pieceConstants} from '../../constants/pieceConstants'

export const piecesReducer = (state = { pieces: [] }, action) => {
    switch (action.type) {
        case pieceConstants.ALL_PIECE_REQUEST:
        case pieceConstants.ADMIN_PIECE_REQUEST:
            return {
                loading: true,
                pieces: []
            }

        case pieceConstants.ALL_PIECE_SUCCESS:
            return {
                loading: false,
                pieces: action.payload.pieces,
                piecesCount: action.payload.piecesCount,
                // resPerPage: action.payload.resPerPage,
                // filteredpiecesCount: action.payload.filteredpiecesCount
            }

        case pieceConstants.ADMIN_PIECE_SUCCESS:
            return {
                loading: false,
                pieces: action.payload
            }

        case pieceConstants.ALL_PIECE_FAIL:
        case pieceConstants.ADMIN_PIECE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case pieceConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newPieceReducer = (state = { piece: {} }, action) => {
    switch (action.type) {

        case pieceConstants.NEW_PIECE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case pieceConstants.NEW_PIECE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                // piece: action.payload.piece,
                // token: action.payload.token
            }

        case pieceConstants.NEW_PIECE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case pieceConstants.NEW_piece_RESET:
            return {
                ...state,
                success: false
            }

        case pieceConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const pieceReducer = (state = {}, action) => {
    switch (action.type) {

        case pieceConstants.DELETE_PIECE_REQUEST:
        case pieceConstants.UPDATE_PIECE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case pieceConstants.DELETE_PIECE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.isDeleted
            }

        case pieceConstants.UPDATE_PIECE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.isUpdated
            }


        case pieceConstants.DELETE_PIECE_FAIL:
        case pieceConstants.UPDATE_PIECE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case pieceConstants.DELETE_piece_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case pieceConstants.UPDATE_piece_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case pieceConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const pieceDetailsReducer = (state = { piece: {} }, action) => {
    switch (action.type) {

        case pieceConstants.PIECE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case pieceConstants.PIECE_DETAILS_SUCCESS:
            return {
                loading: false,
                piece: action.payload.piece
            }

        case pieceConstants.PIECE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case pieceConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}