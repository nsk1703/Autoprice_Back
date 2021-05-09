import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_machines from '../common/dataTables/data_machines';
import * as machineActions from "../../redux/actions/machineActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

export class List_machine extends Component {
    constructor(props) {
        super(props);
        let listMachines = [];

        this.state = {
            open: false,
            machines: []
        };

        this.props.machines();

        setTimeout(() => {
            console.log(this.props.machine.machines)

            this.props.machine.machines.map(machine => {
                let item = {
                    ID: machine.id,
                    Nom: machine.nom,
                    Type: machine.type,
                    Montant: machine.montant,
                    lien: machine.lien,
                    statut: machine.status,
                    etat: machine.etat,
                    description: machine.description
                }

                listMachines.push(item);
            })
            
            this.setState({
                machines: listMachines
            })
            
        }, 1000)

        this.state = {
            open: false,
            machines: listMachines
        };
    }
    render() {
        const {machines} =this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des machines" parent="Machines" />
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            <div className="btn-popup pull-left">
                                <Link to="/machines/create-machine" className="btn btn-primary">Ajout de Machine</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_machines
                                    multiSelectOption={true}
                                    myData={machines}
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
        machine: state.machine
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_machine)
