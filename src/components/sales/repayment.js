import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_repayment from '../common/dataTables/data_repayment';
import * as remboursementActions from "../../redux/actions/remboursementActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Transactions_sales} from "./transactions-sales";

export class Repayment_sales extends Component {

    constructor(props) {
        super(props);
        let listRemboursements = [];

        this.state = {
            open: false,
            data: []
        };

        this.props.listRemboursements();


        setTimeout(() => {
            console.log(this.props.remboursement.remboursements)

            this.props.remboursement.remboursements.map(remboursement => {

                let item = {
                    ID: "#"+remboursement.id,
                    methode: remboursement.methode,
                    total: <span className="badge badge-info">{remboursement.montant} FCFA</span>,
                    status: (remboursement.status != "0")? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Description: remboursement.description,
                    Téléphone: remboursement.telephone,
                    description: remboursement.description
                }
                listRemboursements.push(item);
            })


            this.setState({
                    data: listRemboursements
                })
        }, 2000)


        this.state = {
            open: false,
            data: listRemboursements
        };
    }

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
        remboursement: state.remboursement
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        listRemboursements: () => {dispatch( remboursementActions.listRemboursements())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Repayment_sales))
