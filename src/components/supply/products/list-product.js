import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_products from '../../common/dataTables/data_products';


export class List_product extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Liste des produits" parent="Produits" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/supply/products/create-product" className="btn btn-primary">Ajout Produit</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_products
                                    multiSelectOption={true}
                                    myData={data}
                                    pageSize={10}
                                    pagination={true}
                                    class="-striped -highlight"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default List_product
