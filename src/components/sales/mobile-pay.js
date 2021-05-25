import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from '../common/datatable';
import Data_mobilePay from '../common/dataTables/data_mobilePay';
import * as transactionomActions  from "../../redux/actions/transactionomActions";
import { connect } from 'react-redux';  
import {withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions from "../../redux/actions/roleActions";

export class Mobile_pay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            transactions: [],
            roles: null,
            visible: false
        };
    }

    componentDidMount = () => {
        let listTransactions = [];
        let rol = null;

        this.props.transactions();

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
                transactions: listTransactions
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.mobileMoney;
            })
            this.setState({
                roles: rol
            })
            // if(this.props.roledetails.role[0].mobileMoney == '1'){
            //     this.setState({
            //         visible: true
            //     })
            // }
        }, 1000)
    }

    render() {
        const {transactions, roles} = this.state
        if(roles == '1'){
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
                                    <ToastContainer />
                                    <div className="card-body">
                                        <div id="batchDelete" className="transactions">
                                            <Data_mobilePay
                                                multiSelectOption={false}
                                                myData={transactions}
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
        transactionom: state.transactionom,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        transactions: () => {dispatch( transactionomActions.transactions())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mobile_pay))
