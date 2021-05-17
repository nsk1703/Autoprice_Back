import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_maintains from '../common/dataTables/data_maintains';
import * as maintenanceActions from "../../redux/actions/maintenanceActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

export class List_maintain extends Component {
    constructor(props) {
        super(props);
        let listMaintenances = [];

        this.state = {
            open: false,
            maintenances: []
        };

        this.props.maintenances();

        setTimeout(() => {
            // console.log(this.props.maintenance.maintenances)

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
        this.state = {
            open: false,
            maintenances: listMaintenances
        };
    }
    render() {
        const {maintenances} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des maintenances" parent="Maintenance" />
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/maintains/create-maintain" className="btn btn-primary">Effectuer une maintenance</Link>
                            </div>
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
    }
}

const mapStateToProps = (state) => {
    return {
        maintenance: state.maintenance
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        maintenances: () => {dispatch( maintenanceActions.maintenances())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_maintain)
