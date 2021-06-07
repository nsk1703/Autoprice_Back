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
import BeatLoader from "react-spinners/BeatLoader";

export class List_currency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: null,
            currencies: [],
            visible: false,
            loading: false
        };        
 
    }

    componentDidMount = () => {
        let listCurrencies = [];
        let rol = null;

        this.setState({
            loading: true
        })

        this.props.appromonnaies();

        setTimeout(() => {
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
            console.log(listCurrencies)
            this.setState({
                currencies: listCurrencies
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.listeApproMonnaie;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterApproMonnaie == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                loading: false
            })
        }, 1000)

    }
    
    render() {
        const { loading, currencies, roles, visible } = this.state

        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles != 0) {
                return (
                    <Fragment>
                        <Breadcrumb title="Liste des monnaies" parent="Approvisionnement / Monnaies" />
                        <div className="container-fluid">
                            <div className="card">
                            {visible == true ?
                                (
                                    <div className="card-header">
                                        <Link to="/supply/currency/create-currency" className="btn btn-primary">Ajout de Monnaie</Link>
                                    </div>
                                ):
                                null
                            }
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
