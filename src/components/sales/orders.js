import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/orders';
import Datatable from '../common/datatable'
import Data_orders from '../common/dataTables/data_orders';

export class Orders extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Commandes" parent="Ventes" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Gestionnaire de Commandes</h5>
                                </div>
                                <div className="card-body order-datatable">
                                <Data_orders
                                    multiSelectOption={false}
                                    myData={data}
                                    check={false}
                                    pageSize={10}
                                    pagination={true}
                                    class="-striped -highlight"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Orders
