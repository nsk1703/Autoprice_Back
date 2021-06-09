import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_maintains from '../common/dataTables/data_maintains';
import * as maintenanceActions from "../../redux/actions/maintenanceActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class List_maintain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            maintenances: [],
            roles: null,
            visible: false,
            loading: false
        };
    }

    componentDidMount = () => {
        let listMaintenances = [];
        let rol = null;

        this.setState({
            loading: true
        })

        this.props.maintenances();

        setTimeout(() => {
            this.props.maintenance.maintenances.map(maintenance => {
                let item = {
                    ID: maintenance.id,
                    Nom: maintenance.nom,
                    Type: maintenance.type,
                    Montant: maintenance.montant,
                    Machine: maintenance.machine_id.nom,
                    etat:maintenance.etat,
                    description:maintenance.description,
                    date: maintenance.dateMaintenance,
                    utilisateur :maintenance.utilisateurid,
                    
                }
                listMaintenances.push(item);
            })
            this.setState({
                maintenances: listMaintenances
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.listeMaintenance;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterMaintenance == '1'){
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
        const {maintenances, roles, visible, loading} = this.state

        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{

            if(roles == '1'){
                return (
                    <Fragment>
                        <Breadcrumb title="Liste des maintenances" parent="Maintenance" />
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    {visible == true ?
                                        (
                                            <div className="btn-popup pull-right">
                                                <Link to="/maintains/create-maintain" className="btn btn-primary">Effectuer une maintenance</Link>
                                            </div>
                                        ):
                                        null
                                    }
                                    <div className="clearfix"></div>
                                    <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                        <Data_maintains
                                            multiSelectOption={true}
                                            myData={maintenances}
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

const mapStateToProps = (state) => {
    return {
        maintenance: state.maintenance,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        maintenances: () => {dispatch( maintenanceActions.maintenances())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_maintain)
