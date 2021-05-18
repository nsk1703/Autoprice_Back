import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_currencies from '../../common/dataTables/data_currencies';
import * as appromonnaieActions  from "../../../redux/actions/appromonnaieActions";
import * as roleActions  from "../../../redux/actions/roleActions";
import { connect } from 'react-redux';  
import { ToastContainer, toast } from 'react-toastify';

export class List_currency extends Component {
    constructor(props) {
        super(props)
        let listCurrencies = []
        let rol = null

        this.state = {
            roles: [],
            currencies: []
        };

        console.log(localStorage.getItem('roles'))
        this.props.appromonnaies();

        setTimeout(() => {
            // console.log(this.props.appromonnaie.appromonnaies)

            this.props.appromonnaie.appromonnaies.map(appromonnaie => {
               
                let item = {
                    ID: appromonnaie.id,
                    etat: appromonnaie.etat,
                    quantite: <span className="badge badge-info">{appromonnaie.quantite} FCFA</span>,
                    Machine: appromonnaie.machine_id.nom,
                    Description: appromonnaie.description,
                   
                }
                listCurrencies.push(item);
            })

            this.setState({
                currencies: listCurrencies
            })
        }, 1000)

        // this.state ={
        //     currencies: listCurrencies
        // }

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                // console.log(rl.listeApproMonnaie)
                // role.push(rol.listeApproMonnaie)
                rol = rl.listeApproMonnaie;
                console.log(rol)
            })
            this.setState({
                roles: rol
            })
        }, 1000)

        // console.log(rol)
        this.state ={
            currencies: listCurrencies,
            roles: rol
        }
 
    }
    render() {
        const { currencies, roles } = this.state
        console.log(roles)
        
        if(roles !== null) {
            return (
                <Fragment>
                    <Breadcrumb title="Liste des monnaies" parent="Approvisionnement / Monnaies" />
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/supply/currency/create-currency" className="btn btn-primary">Ajout de Monnaie</Link>
                            </div>
                            <div className="card-body">
                                <ToastContainer />
                                <div className="clearfix"></div>
                                <div id="batchDelete" className="category-table user-list appromonnaie-table coupon-list-delete">
                                    <Data_currencies
                                        multiSelectOption={true}
                                        myData={currencies}
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
        }else{
            return (
                <Fragment>
                    
                </Fragment>
            )
        }
       
    }
}

const mapStateToProps = (state) =>{
    return {
        appromonnaie: state.appromonnaie,
        roledetails: state.roledetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        appromonnaies: () => {dispatch(appromonnaieActions.appromonnaies())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List_currency)
