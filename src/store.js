import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productReducer, productDetailsReducer } from './reducers/productReducers'
import { appromonnaiesReducer, newAppromonnaieReducer, appromonnaieReducer, appromonnaieDetailsReducer } from './reducers/appromonnaieReducers'
import { approproduitsReducer, newApproproduitReducer, approproduitReducer, approproduitDetailsReducer } from './reducers/approproduitReducers'
import { logssReducer, newLogsReducer, logsReducer, logsDetailsReducer } from './reducers/logsReducers'
import { machinesReducer, newMachineReducer, machineReducer, machineDetailsReducer } from './reducers/machineReducers'
import { maintenancesReducer, newMaintenanceReducer, maintenanceReducer, maintenanceDetailsReducer } from './reducers/maintenanceReducers'
import { paiementsReducer, newPaiementReducer, paiementReducer, paiementDetailsReducer } from './reducers/paiementReducers'
import { remboursementsReducer, newRemboursementReducer, remboursementReducer, remboursementDetailsReducer } from './reducers/remboursementReducers'
import { transactionomsReducer, newTransactionomReducer, transactionomReducer, transactionomDetailsReducer } from './reducers/transactionomReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

    transactionoms: transactionomsReducer,
    transactionomDetails: transactionomDetailsReducer,
    newTransactionom: newTransactionomReducer,
    transactionom: transactionomReducer,

    remboursements: remboursementsReducer,
    remboursementDetails: remboursementDetailsReducer,
    newRemboursement: newRemboursementReducer,
    remboursement: remboursementReducer,

    paiements: paiementsReducer,
    paiementDetails: paiementDetailsReducer,
    newPaiement: newPaiementReducer,
    paiement: paiementReducer,

    maintenances: maintenancesReducer,
    maintenanceDetails: maintenanceDetailsReducer,
    newMaintenance: newMaintenanceReducer,
    maintenance: maintenanceReducer,

    machines: machinesReducer,
    machineDetails: machineDetailsReducer,
    newMachine: newMachineReducer,
    machine: machineReducer,

    logss: logssReducer,
    logsDetails: logsDetailsReducer,
    newLogs: newLogsReducer,
    logs: logsReducer,

    approproduits: approproduitsReducer,
    approproduitDetails: approproduitDetailsReducer,
    newApproproduit: newApproproduitReducer,
    approproduit: approproduitReducer,

    appromonnaies: appromonnaiesReducer,
    appromonnaieDetails: appromonnaieDetailsReducer,
    newAppromonnaie: newAppromonnaieReducer,
    appromonnaie: appromonnaieReducer,


    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
})


let initialState = {

}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;