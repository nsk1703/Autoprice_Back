import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_currencies from '../../common/dataTables/data_currencies';

export class List_currency extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Liste des monnaies" parent="Monnaies" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/supply/currency/create-currency" className="btn btn-primary">Ajout de Monnaie</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_currencies
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

export default List_currency