import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_transactions from '../common/dataTables/data_transactions';

export class Transactions_sales extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Paiements" parent="Ventes" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Détails des Paiements</h5>
                                </div>
                                <div className="card-body">
                                    <div id="batchDelete" className="transactions">
                                        <Data_transactions
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
                </div>
            </Fragment>
        )
    }
}

export default Transactions_sales
