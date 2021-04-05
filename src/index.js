import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';
import { authConstants } from "../src/constants/userConstants";

import Create_product from './components/supply/products/create-product';
// Axios
import axios from "axios";

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import of reducers
import {appromonnaiesReducer, newAppromonnaieReducer, appromonnaieReducer, appromonnaieDetailsReducer} from './redux/reducers/appromonnaieReducers'
import {approproduitsReducer, newApproproduitReducer, approproduitReducer, approproduitDetailsReducer} from './redux/reducers/approproduitReducers';
// import {arduinoReducers} from './redux/reducers/arduinoReducers';
import {logssReducer, newLogsReducer, logsReducer, logsDetailsReducer} from './redux/reducers/logsReducers';
import {categoryReducer, categoriesReducer, newCategoryReducer} from './redux/reducers/categoryReducers';
import {machinesReducer, newMachineReducer, machineReducer, machineDetailsReducer} from './redux/reducers/machineReducers';
import {maintenancesReducer, newMaintenanceReducer, maintenanceReducer, maintenanceDetailsReducer} from './redux/reducers/maintenanceReducers';
import {newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './redux/reducers/orderReducers';
import {paiementsReducer, newPaiementReducer, paiementReducer, paiementDetailsReducer} from './redux/reducers/paiementReducers';
import {productsReducer, newProductReducer, productReducer, productDetailsReducer} from './redux/reducers/productReducers';
import {remboursementsReducer, newRemboursementReducer, remboursementReducer, remboursementDetailsReducer} from './redux/reducers/remboursementReducers';
import {transactionomsReducer, transactionomReducer, newTransactionomReducer, transactionomDetailsReducer} from './redux/reducers/transactionomReducers';
import {authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer} from './redux/reducers/userReducers';

// Components
import Dashboard from './components/dashboard';

// Products physical
import Category from './components/products/physical/category';
import Sub_category from './components/products/physical/sub-category';
import Product_list from './components/products/physical/product-list';
import Add_product from './components/products/physical/add-product';
import Product_detail from './components/products/physical/product-detail';

//Product Digital
import Digital_category from './components/products/digital/digital-category';
import Digital_sub_category from './components/products/digital/digital-sub-category';
import Digital_pro_list from './components/products/digital/digital-pro-list';
import Digital_add_pro from './components/products/digital/digital-add-pro';

//Sales
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
import Repayment_sales from './components/sales/repayment';

//Coupons
import ListCoupons from './components/coupons/list-coupons';
import Create_coupons from './components/coupons/create-coupons';

//Pages
import ListPages from './components/pages/list-page';
import Create_page from './components/pages/create-page';
import Media from './components/media/media';
import List_menu from './components/menus/list-menu';
import Create_menu from './components/menus/create-menu';
import List_user from './components/users/list-user';
import Create_user from './components/users/create-user';
import List_vendors from './components/vendors/list-vendors';
import Create_vendors from './components/vendors/create.vendors';
import Translations from './components/localization/translations';
import Rates from './components/localization/rates';
import Taxes from './components/localization/taxes';
import Profile from './components/settings/profile';
import Reports from './components/reports/report';
import Invoice from './components/invoice';
import Datatable from './components/common/datatable'
import Login from './components/auth/login';
import Create_slide from "./components/slides/create-slide";
import Change_roles from "./components/roles/change-role";
import Roles_list from "./components/roles/roles-list";
import Add_roles from "./components/roles/add-roles";
import List_slide from "./components/slides/list-slide";
import List_maintain from "./components/maintains/list-maintain";
import Create_maintain from "./components/maintains/create-maintain";
import List_machine from "./components/machines/list-machine";
import Create_machine from "./components/machines/create-machine";
import List_product from "./components/supply/products/list-product";
import List_currency from "./components/supply/currency/list-currency";
import Create_currency from "./components/supply/products/create-product";
import Change_password from "./components/settings/change-password";
import Change_profile from "./components/settings/change-profile";
import Mobile_pay from "./components/sales/mobile-pay";
import Log from "./components/logs/log";

axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_REST_API;

const rootReducers = combineReducers({
    appromonnaie: appromonnaiesReducer, newAppromonnaieReducer, appromonnaieReducer, appromonnaieDetailsReducer,
    approproducts: approproduitsReducer, newApproproduitReducer, approproduitReducer, approproduitDetailsReducer,
    // arduino: arduinoReducers,
    logs: logssReducer, newLogsReducer, logsReducer, logsDetailsReducer,
    category: categoriesReducer, newCategoryReducer, categoryReducer,
    machine: machinesReducer, newMachineReducer, machineReducer, machineDetailsReducer,
    maintenance: maintenancesReducer, newMaintenanceReducer, maintenanceReducer, maintenanceDetailsReducer,
    order: newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer,
    paiement: paiementsReducer, newPaiementReducer, paiementReducer, paiementDetailsReducer,
    product: productsReducer, newProductReducer, productReducer, productDetailsReducer,
    repayment: remboursementsReducer, newRemboursementReducer, remboursementReducer, remboursementDetailsReducer,
    transaction: transactionomsReducer, newTransactionomReducer, transactionomReducer, transactionomDetailsReducer,
    user: authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));
window.store = store;
// const token = localStorage.getItem('token');

class Root extends Component {

    // useEffect(() =>{
    //     if (!localStorage.getItem('token')) {
    //         dispatch(login())
    //     }
    // })
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <Route path='/login' component={Login} />
                            {/* <Route exact path='/login' component={Login} /> */}
                            <App>
                                <Route exact path='/' component={Dashboard} />

                                <Route path={`${process.env.PUBLIC_URL}/products/physical/category`} component={Category} />
                                <Route path={`${process.env.PUBLIC_URL}/products/physical/sub-category`} component={Sub_category} />
                                <Route path={`${process.env.PUBLIC_URL}/products/physical/product-list`} component={Product_list} />
                                <Route path={`${process.env.PUBLIC_URL}/products/physical/product-detail`} component={Product_detail} />
                                <Route path={`${process.env.PUBLIC_URL}/products/physical/add-product`} component={Add_product} />

                                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-category`} component={Digital_category} />
                                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`} component={Digital_sub_category} />
                                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`} component={Digital_pro_list} />
                                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`} component={Digital_add_pro} />

                                <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
                                <Route path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />
                                <Route path={`${process.env.PUBLIC_URL}/sales/repayment`} component={Repayment_sales} />
                                <Route path={`${process.env.PUBLIC_URL}/sales/mobile-pay`} component={Mobile_pay} />

                                <Route path={`${process.env.PUBLIC_URL}/coupons/list-coupons`} component={ListCoupons} />
                                <Route path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

                                <Route path={`${process.env.PUBLIC_URL}/pages/list-page`} component={ListPages} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/create-page`} component={Create_page} />

                                <Route path={`${process.env.PUBLIC_URL}/media`} component={Media} />

                                <Route path={`${process.env.PUBLIC_URL}/menus/list-menu`} component={List_menu} />
                                <Route path={`${process.env.PUBLIC_URL}/menus/create-menu`} component={Create_menu} />

                                <Route path={`${process.env.PUBLIC_URL}/users/list-user`} component={List_user} />
                                <Route path={`${process.env.PUBLIC_URL}/users/create-user`} component={Create_user} />

                                <Route path={`${process.env.PUBLIC_URL}/vendors/list_vendors`} component={List_vendors} />
                                <Route path={`${process.env.PUBLIC_URL}/vendors/create-vendors`} component={Create_vendors} />

                                <Route path={`${process.env.PUBLIC_URL}/localization/transactions`} component={Translations} />
                                <Route path={`${process.env.PUBLIC_URL}/localization/currency-rates`} component={Rates} />
                                <Route path={`${process.env.PUBLIC_URL}/localization/taxes`} component={Taxes} />

                                <Route path={`${process.env.PUBLIC_URL}/reports/report`} component={Reports} />

                                <Route path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />
                                <Route path={`${process.env.PUBLIC_URL}/settings/change-profile`} component={Change_profile} />
                                <Route path={`${process.env.PUBLIC_URL}/settings/change-password`} component={Change_password} />

                                <Route path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />

                                <Route path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} />

                                <Route path={`${process.env.PUBLIC_URL}/supply/currency/create-currency`} component={Create_currency}/>
                                <Route path={`${process.env.PUBLIC_URL}/supply/currency/list-currency`} component={List_currency}/>

                                <Route path={`${process.env.PUBLIC_URL}/supply/products/create-product`} component={Create_product}/>
                                <Route path={`${process.env.PUBLIC_URL}/supply/products/list-product`} component={List_product}/>

                                <Route path={`${process.env.PUBLIC_URL}/machines/create-machine`} component={Create_machine}/>
                                <Route path={`${process.env.PUBLIC_URL}/machines/list-machine`} component={List_machine}/>

                                <Route path={`${process.env.PUBLIC_URL}/maintains/create-maintain`} component={Create_maintain}/>
                                <Route path={`${process.env.PUBLIC_URL}/maintains/list-maintain`} component={List_maintain}/>

                                <Route path={`${process.env.PUBLIC_URL}/slides/create-slide`} component={Create_slide}/>
                                <Route path={`${process.env.PUBLIC_URL}/slides/list-slide`} component={List_slide}/>

                                <Route path={`${process.env.PUBLIC_URL}/logs/Log`} component={Log}/>

                                <Route path={`${process.env.PUBLIC_URL}/roles/add-roles`} component={Add_roles}/>
                                <Route path={`${process.env.PUBLIC_URL}/roles/roles-list`} component={Roles_list}/>
                                <Route path={`${process.env.PUBLIC_URL}/roles/change_roles`} component={Change_roles}/>

                            </App>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));

