import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_machines from '../common/dataTables/data_machines';
import * as machineActions from "../../redux/actions/machineActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class List_machine extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            machines: [],
            roles: null,
            visible: false,
            loading: false
        };
    }

    componentDidMount = () => {
        let listMachines = [];
        let listeMachine= null;

        this.setState({
            loading: true
        })
        this.props.machines();

        setTimeout(() => {
            // console.log(this.props.machine.machines)
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
                machines: listMachines,
            })
            
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))
        
        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                listeMachine = rl.listeMachine
            })
            this.setState({
                roles: listeMachine
            })
            if(this.props.roledetails.role[0].ajouterMachine == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                loading: false,
            })
        }, 1000)

    }

    render() {
        const {machines, visible, roles, loading} =this.state
        // console.log('mach',machines)
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
                        <Breadcrumb title="Liste des machines" parent="Machines" />
                        <div className="container-fluid">
                            <div className="card">
                                {visible == true ?
                                    (
                                        <div className="card-header">
                                            <Link to="/machines/create-machine" className="btn btn-primary">Ajout de Machine</Link>
                                        </div>
                                    )
                                    : null
                                } 
                                <div className="card-body">
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
        machine: state.machine,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_machine)
