import {machineConstants} from '../../constants/machineConstants'

export const machinesReducer = (state = { machines: [] }, action) => {
    switch (action.type) {
        case machineConstants.ALL_MACHINE_REQUEST:
        case machineConstants.ADMIN_MACHINE_REQUEST:
            return {
                loading: true,
                machines: []
            }

        case machineConstants.ALL_MACHINE_SUCCESS:
            return {
                loading: false,
                machines: action.payload.machines,
                machinesCount: action.payload.machinesCount,
                // resPerPage: action.payload.resPerPage,
                // filteredmachinesCount: action.payload.filteredmachinesCount
            }

        case machineConstants.ADMIN_MACHINE_SUCCESS:
            return {
                loading: false,
                machines: action.payload
            }

        case machineConstants.ALL_MACHINE_FAIL:
        case machineConstants.ADMIN_MACHINE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case machineConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newMachineReducer = (state = { machine: {} }, action) => {
    switch (action.type) {

        case machineConstants.NEW_MACHINE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case machineConstants.NEW_MACHINE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                machine: action.payload.machine,
                token: action.payload.token
            }

        case machineConstants.NEW_MACHINE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case machineConstants.NEW_MACHINE_RESET:
            return {
                ...state,
                success: false
            }

        case machineConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const machineReducer = (state = {}, action) => {
    switch (action.type) {

        case machineConstants.DELETE_MACHINE_REQUEST:
        case machineConstants.UPDATE_MACHINE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case machineConstants.DELETE_MACHINE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case machineConstants.UPDATE_MACHINE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case machineConstants.DELETE_MACHINE_FAIL:
        case machineConstants.UPDATE_MACHINE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case machineConstants.DELETE_MACHINE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case machineConstants.UPDATE_MACHINE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case machineConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const machineDetailsReducer = (state = { machine: {} }, action) => {
    switch (action.type) {

        case machineConstants.MACHINE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case machineConstants.MACHINE_DETAILS_SUCCESS:
            return {
                loading: false,
                machine: action.payload
            }

        case machineConstants.MACHINE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case machineConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}