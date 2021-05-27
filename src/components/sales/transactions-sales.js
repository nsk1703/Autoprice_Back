import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_transactions from '../common/dataTables/data_transactions';
import * as paiementsActions  from "../../redux/actions/paiementActions";
import { connect } from 'react-redux';  
import {withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions from "../../redux/actions/roleActions";

export class Transactions_sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
           paiements: [],
           roles: null
        };
        
    }

    componentDidMount = () => {
        let listPaiements = [];
        let rol = null

        this.props.paiements();

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
                paiements: listPaiements
            })

        }, 1000)
        
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.paiements;
            })
            this.setState({
                roles: rol
            })
        }, 1000)
    }

    render() {
        const {paiements, roles} = this.state
        if(roles == '1'){
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
                                    <ToastContainer />
                                    <div className="card-body">
                                        <div id="batchDelete" className="transactions">
                                            <Data_transactions
                                                multiSelectOption={false}
                                                myData={paiements}
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
        }else{
            return(
                <Fragment>

                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        paiement: state.paiement,
        roledetails: state.roledetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        paiements: () => {dispatch(paiementsActions.paiements())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Transactions_sales))
