import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_mobilePay from '../common/dataTables/data_mobilePay';
import * as transactionomActions from "../../redux/actions/transactionomActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Repayment_sales} from "./repayment";

export class Mobile_pay extends Component {
    constructor(props) {
        super(props);
        let listTransactions = [];

        this.state = {
            open: false,
            data: []
        };

        this.props.listTransactions();


        setTimeout(() => {
            console.log(this.props.transactionom.transactionoms)

            this.props.transactionom.transactionoms.map(transactionom => {

                let item = {
                    ID: "#"+transactionom.id,
                    machine: transactionom.machine_id.nom,
                    total: <span className="badge badge-info">{transactionom.montant} FCFA</span>,
                    status: (transactionom.status != "0")? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Description: transactionom.description,
                    Téléphone: transactionom.telephone,
                    description: transactionom.description,
                    Date: Date(transactionom.dateTransaction),
                }
                listTransactions.push(item);
            })


            this.setState({
                    data: listTransactions
                })
        }, 2000)


        this.state = {
            open: false,
            data: listTransactions
        };
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Mobile Money" parent="Ventes" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Paiements mobile</h5>
                                </div>
                                <div className="card-body">
                                    <div id="batchDelete" className="transactions">
                                        <Data_mobilePay
                                            multiSelectOption={false}
                                            myData={this.state.data}
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

const mapStateToProps = (state) => {
    return {
        transactionom: state.transactionom
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        listTransactions: () => {dispatch( transactionomActions.listTransactions())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mobile_pay))
