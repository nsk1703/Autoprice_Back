import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';
import { authConstants } from "../src/constants/userConstants";

import axios from "axios";

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import of reducers
import {appromonnaiesReducer, newAppromonnaieReducer, appromonnaieReducer, appromonnaieDetailsReducer} from './redux/reducers/appromonnaieReducers'
import {approproduitsReducer, newApproproduitReducer, approproduitReducer, approproduitDetailsReducer} from './redux/reducers/approproduitReducers';
import {newRoleReducer, roleReducer, rolesReducer, roleDetailsReducer} from './redux/reducers/rolesReducer';
import {logssReducer, newLogsReducer, logsReducer, logsDetailsReducer} from './redux/reducers/logsReducers';
import {categoryReducer, categoriesReducer, newCategoryReducer, categoryDetailsReducer} from './redux/reducers/categoryReducers';
import {machinesReducer, newMachineReducer, machineReducer, machineDetailsReducer} from './redux/reducers/machineReducers';
import {maintenancesReducer, newMaintenanceReducer, maintenanceReducer, maintenanceDetailsReducer} from './redux/reducers/maintenanceReducers';
import {newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './redux/reducers/orderReducers';
import {paiementsReducer, newPaiementReducer, paiementReducer, paiementDetailsReducer} from './redux/reducers/paiementReducers';
import {productsReducer, newProductReducer, productReducer, productDetailsReducer} from './redux/reducers/productReducers';
import {remboursementsReducer, newRemboursementReducer, remboursementReducer, remboursementDetailsReducer} from './redux/reducers/remboursementReducers';
import {slidesReducer, newSlideReducer, slideReducer, slideDetailsReducer} from './redux/reducers/slideReducers';
import {transactionomsReducer, transactionomReducer, newTransactionomReducer, transactionomDetailsReducer} from './redux/reducers/transactionomReducers';
import {authReducer, userReducer, forgotPasswordReducer, newUsersReducer, allUsersReducer, userDetailsReducer} from './redux/reducers/userReducers';

// Components
import Dashboard from './components/dashboard';

// Products physical
import Category from './components/products/physical/category';
import Sub_category from './components/products/physical/sub-category';
import Product_list from './components/products/physical/product-list';
import Add_product from './components/products/physical/add-product';
import Edit_products from './components/products/physical/edit-products';
import Product_detail from './components/products/physical/product-detail';

//Product Digital
import Digital_category from './components/products/digital/digital-category';
import Digital_sub_category from './components/products/digital/digital-sub-category';
import Digital_pro_list from './components/products/digital/digital-pro-list';
import Digital_add_pro from './components/products/digital/digital-add-pro';

//Sales
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
import Mobile_pay from './components/sales/mobile-pay';
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

import Create_currency from './components/supply/currency/create_currency';
import List_currency from './components/supply/currency/list-currency';
import Edit_currency from './components/supply/currency/edit-currency';

import Create_product from './components/supply/products/create-product';
import List_product from './components/supply/products/list-product';
import Edit_product from './components/supply/products/edit-product';

import List_user from './components/users/list-user';
import Edit_user from './components/users/edit-user';
import Create_user from './components/users/create-user';

import Create_machine from './components/machines/create-machine';
import List_machine from './components/machines/list-machine';
import Edit_machine from './components/machines/Edit-machine';

import Create_maintain from './components/maintains/create-maintain';
import List_maintain from './components/maintains/list-maintain';
import Edit_maintain from './components/maintains/edit-maintain';

import Create_slide from './components/slides/create-slide';
import List_slide from './components/slides/list-slide';
import Edit_slide from './components/slides/edit-slide';


// import Create_log from './components/logs/create-log';
import Log  from './components/logs/log';

import { Change_profile } from './components/settings/change-profile';
import Change_password from './components/settings/change-password';

import Add_roles from './components/roles/add-roles';
import Roles_list from './components/roles/roles-list';
import Change_roles from './components/roles/change-role';
import Edit_roles from './components/roles/edit-roles';

import PageNotFound from './components/PageNotFound';

import ProtectedRoute from './routes/ProtectedRoute';

axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_REST_API;

const rootReducers = combineReducers({
    appromonnaie: appromonnaiesReducer,
    
    approproduit: approproduitsReducer, 
    // arduino: arduinoReducers,
    log: logssReducer, newLogsReducer, logsReducer, logsDetailsReducer,
    category: categoriesReducer,  
    machine: machinesReducer,
    maintenance: maintenancesReducer, 
    order: allOrdersReducer,
    paiement: paiementsReducer, newPaiementReducer, paiementReducer, paiementDetailsReducer,
    product: productsReducer,
    role: rolesReducer,

    productaction: productReducer,

    // editproduct: productReducer,
    editappromonnaie: appromonnaieReducer,
    editapproproduit: approproduitReducer,
    editmachine: machineReducer,
    editmaintenance: maintenanceReducer,
    editslide: slideReducer,
    editcategory: categoryReducer,
    edituser: userReducer,
    editrole: roleReducer,

    maindetails: maintenanceDetailsReducer,
    machdetails: machineDetailsReducer,
    appromondetails: appromonnaieDetailsReducer,
    approprodetails: approproduitDetailsReducer,
    prodetails: productDetailsReducer,
    slidetails: slideDetailsReducer,
    catdetails: categoryDetailsReducer,
    userdetails: userDetailsReducer,
    roledetails: roleDetailsReducer,
    
    addappromonnaie: newAppromonnaieReducer, 
    addapproproduit: newApproproduitReducer,
    addmaintenance: newMaintenanceReducer,
    addmachine: newMachineReducer,
    addslide: newSlideReducer,
    addcategory: newCategoryReducer,
    adduser: newUsersReducer,
    addrole: newRoleReducer,
    addproduct: newProductReducer,

    remboursement: remboursementsReducer, newRemboursementReducer, remboursementReducer, remboursementDetailsReducer,
    slide: slidesReducer, 
    transactionom: transactionomsReducer, newTransactionomReducer, transactionomReducer, transactionomDetailsReducer,
    auth: authReducer, 
    user: allUsersReducer, userDetailsReducer,  userReducer, forgotPasswordReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
window.store = store;
const token = window.localStorage.getItem('token')

class Root extends Component {

    componentDidMount = () => {
        console.log(token)
        // localStorage.
        // let token = localStorage.removeItem('token')
        // console.log(token)
        // if(!token){
        //     <Redirect to="/login"/>
        // }
    }

    
    // useEffect(() =>{
    //     if (!token) {
    //         dispatch(login())
    //     }
    // })
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            
                            {/* <Route exact path='/login' component={Login} /> */}
                            <App>
                                {/* <Route component={PageNotFound} /> */}
                                <ProtectedRoute exact path='/' component={Dashboard} />
                                    
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/category`} component={Category} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/sub-category`} component={Sub_category} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/product-list`} component={Product_list} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/product-detail`} component={Product_detail} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/add-product`} component={Add_product} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/physical/edit-products/:id`} component={Edit_products} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-category`} component={Digital_category} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`} component={Digital_sub_category} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`} component={Digital_pro_list} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`} component={Digital_add_pro} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/sales/repayment`} component={Repayment_sales} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/sales/mobile-pay`} component={Mobile_pay} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/coupons/list-coupons`} component={ListCoupons} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/pages/list-page`} component={ListPages} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/pages/create-page`} component={Create_page} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/media`} component={Media} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/menus/list-menu`} component={List_menu} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/menus/create-menu`} component={Create_menu} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/users/list-user`} component={List_user} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/users/create-user`} component={Create_user} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/users/edit-user/:id`} component={Edit_user} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/vendors/list_vendors`} component={List_vendors} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/vendors/create-vendors`} component={Create_vendors} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/localization/transactions`} component={Translations} />
                                <Route path={`${process.env.PUBLIC_URL}/localization/currency-rates`} component={Rates} />
                                <Route path={`${process.env.PUBLIC_URL}/localization/taxes`} component={Taxes} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/reports/report`} component={Reports} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/settings/change-profile`} component={Change_profile} />
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/settings/change-password`} component={Change_password} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} />

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/currency/create-currency`} component={Create_currency}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/currency/list-currency`} component={List_currency}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/currency/edit-currency/:id`} component={Edit_currency}/>

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/products/create-product`} component={Create_product}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/products/list-product`} component={List_product}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/supply/products/edit-product/:id`} component={Edit_product}/>
                                
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/machines/create-machine`} component={Create_machine}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/machines/list-machine`} component={List_machine}/>
                                <Route path={`${process.env.PUBLIC_URL}/machines/edit-machine/:id`} component={Edit_machine}/>

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/maintains/create-maintain`} component={Create_maintain}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/maintains/list-maintain`} component={List_maintain}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/maintains/edit-maintain/:id`} component={Edit_maintain}/>
                                
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/slides/create-slide`} component={Create_slide}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/slides/list-slide`} component={List_slide}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/slides/edit-slide/:id`} component={Edit_slide}/>
                                
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/logs/Log`} component={Log}/>

                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/roles/add-roles`} component={Add_roles}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/roles/roles-list`} component={Roles_list}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/roles/change_roles`} component={Change_roles}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/roles/edit-roles/:id`} component={Edit_roles}/>

                               
                            </App>

                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));


