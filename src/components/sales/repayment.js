import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_repayment from '../common/dataTables/data_repayment';
import { ToastContainer, toast } from 'react-toastify';
import {connect} from "react-redux";
import * as remboursementActions from "../../redux/actions/remboursementActions";
import {withRouter} from "react-router-dom";
import * as roleActions from "../../redux/actions/roleActions";

export class Repayment_sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            remboursements: [],
            roles: null
        };

    }

    componentDidMount = () => {
        let listRemboursements = [];
        let rol = null;

        this.props.remboursements();

        setTimeout(() => {
            console.log(this.props.remboursement.remboursements)

            this.props.remboursement.remboursements.map(remboursement => {

                let item = {
                    ID: "#"+remboursement.id,
                    methode: remboursement.methode,
                    montant: <span className="badge badge-info">{remboursement.montant} FCFA</span>,
                    status: (remboursement.status != "0")? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Description: remboursement.description,
                    Téléphone: remboursement.telephone,
                    // description: remboursement.description
                }
                listRemboursements.push(item);
            })
            this.setState({
                remboursements: listRemboursements
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.remboursements;
            })
            this.setState({
                roles: rol
            })
        }, 1000)

    }
    render() {
        const {roles, remboursements} = this.state
        
        if(roles == '1'){
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
                                    <ToastContainer />
                                    <div className="card-body">
                                        <div id="batchDelete" className="transactions">
                                            <Data_repayment
                                                multiSelectOption={false}
                                                myData={remboursements}
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
const mapStateToProps = (state) => {
    return {
        remboursement: state.remboursement,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        remboursements: () => {dispatch( remboursementActions.remboursements())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Repayment_sales))
