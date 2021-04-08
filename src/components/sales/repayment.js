import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_repayment from '../common/dataTables/data_repayment';

export class Repayment_sales extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Remboursements" parent="Ventes" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Détails des Remboursements</h5>
                                </div>
                                <div className="card-body">
                                    <div id="batchDelete" className="transactions">
                                        <Data_repayment
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

export default Repayment_sales
