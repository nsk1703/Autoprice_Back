import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_transactions from '../common/dataTables/data_transactions';
import * as paiementActions from "../../redux/actions/paiementActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Category} from "../products/physical/category";
import Image from "../common/image";

export class Transactions_sales extends Component {

    constructor(props) {
        super(props);
        let listPaiements = [];

        this.state = {
            open: false,
            data: []
        };

        this.props.listPaiements();


        setTimeout(() => {
            console.log(this.props.paiement.paiements)

            this.props.paiement.paiements.map(paiement => {

                let item = {
                    ID: "#"+paiement.id,
                    methode: paiement.methode,
                    total: <span className="badge badge-info">{paiement.montant} FCFA</span>,
                    status: (paiement.status != "0")? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Description: paiement.description,
                    Téléphone: paiement.telephone,
                    description: paiement.description
                }
                listPaiements.push(item);
            })


            this.setState({
                    data: listPaiements
                })
        }, 2000)


        this.state = {
            open: false,
            data: listPaiements
        };
    }
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
        paiement: state.paiement
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        listPaiements: () => {dispatch( paiementActions.listPaiements())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Transactions_sales))
