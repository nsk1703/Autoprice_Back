import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import moment from 'moment';
import * as maintenanceActions from "../../redux/actions/maintenanceActions";
import {connect} from "react-redux";
import * as machineActions from "../../redux/actions/machineActions";
import Select from 'react-select';
import * as roleActions from "../../redux/actions/roleActions";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const choices = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]

export class Edit_maintain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            nom: '',
            type: '',
            dateMaintenance: new Date().toString(),
            montant: '',
            description: '',
            machine_id: '',
            AllOptions: [],
            isLoading: false,
            visible: false,
            roles: null,
            loading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = (machine_id) => {
        this.setState({machine_id});        
    }

    handleSelect = (type) => {
        this.setState({ type })   
    }

    componentDidMount = () => {
        let options = [];
        let listMachines = [];
        let rol = null;

        this.setState({
            loading: true
        })

        this.props.machines();

        setTimeout(() => {
            // console.log(this.props.machine.machines)

            this.props.machine.machines.map(machine => {
                // console.log('i',machine.id)
                let item = {
                    id: machine.id,
                    Nom: machine.nom
                }
                listMachines.push(item);
            })
            
            // console.log('maaa',listMachines)
            // console.log(lis)
            listMachines.map(listMachine => {
                let option = 
                    {value:listMachine.id, label: listMachine.Nom }
                
                // console.log(option)
                options.push(option)
            })
            console.log('11111',options)
          
            this.setState({
                AllOptions: options
            })
        }, 1000)

        this.props.detailmaintenance(this.props.match.params.id)

        setTimeout(() => {

            // console.log(this.props.maindetails.maintenance.maintenance)
            
            let type = {value: this.props.maindetails.maintenance.maintenance.type, 
                        label: this.props.maindetails.maintenance.maintenance.type}

            let machine = {value: this.props.maindetails.maintenance.maintenance.machine_id.id, 
                           label: this.props.maindetails.maintenance.maintenance.nom}

            console.log(machine)
            this.setState({
                id: this.props.maindetails.maintenance.maintenance.id,
                nom: this.props.maindetails.maintenance.maintenance.nom,
                type: type ? type : '',
                machine_id: machine ? machine : '',
                dateMaintenance: this.props.maindetails.maintenance.maintenance.dateMaintenance,
                montant: this.props.maindetails.maintenance.maintenance.montant,
                description: this.props.maindetails.maintenance.maintenance.description
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierMaintenance;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeMaintenance == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                loading: false
            })
        }, 1000)
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.editMaintenance(this.state)

        setTimeout(()=> {
            console.log(this.props.editmaintenance.isUpdated)
            if(this.props.editmaintenance.isUpdated.isUpdated === true){
                this.props.history.push('/maintains/list-maintain');
            }else{
                this.props.history.push('/maintains/edit-maintain/'+ this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
       

    }
    
    render() {
        const {loading, roles, visible, AllOptions, nom, type, montant, dateMaintenance, description, machine_id, isLoading} = this.state

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
                        <Breadcrumb title="Modifier une maintenance" parent="Maintenance" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/maintains/list-maintain" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Nom</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom2" type="text" 
                                                    name='nom'
                                                    value={nom}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="number" 
                                                    name='montant'
                                                    value={montant}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Date de Maintenance</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom1" 
                                                    type="date" 
                                                    name='dateMaintenance'
                                                    value={moment(dateMaintenance).format("YYYY-MM-DD")}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" >type :</label>
                                                    {/* <div className=""> */}
                                                        <Select className="col-xl-8 col-md-7"
                                                            name="type"
                                                            value={type}
                                                            options={choices}
                                                            onChange={this.handleSelect}
                                                            required="" 
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" >Nom de machine :</label>
                                                    {/* <div className="col-xl-8 col-md-7"> */}
                                                        <Select className="col-xl-8 col-md-7"
                                                            name="machine_id"
                                                            value={machine_id}
                                                            options={AllOptions}
                                                            onChange={this.handleChange}
                                                            required="" 
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form">
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-md-4">Description :</label>
                                                        {/* <div className=" form-control col-xl-8 col-md-7"> */}
                                                            <textarea className=" form-control col-xl-8 col-md-7" 
                                                            name="description" value={description} 
                                                                onChange={this.handleInputChange}
                                                                rows="10" cols="92"
                                                            />
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="button" 
                                                    className="btn btn-primary"
                                                    onClick={this.handleSubmitChange}
                                                    disabled={isLoading}
                                                    >Modifier</button>
                                                </div>
                                            </form>
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
}

const mapStateToProps = (state, props) => {

    return {
        editmaintenance: state.editmaintenance,
        machine: state.machine,
        maindetails: state.maindetails,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editMaintenance: (maintenance) => {dispatch( maintenanceActions.editMaintenance(maintenance))},
        machines: () => {dispatch( machineActions.machines())},
        detailmaintenance: (mainid) => {dispatch( maintenanceActions.detailmaintenance(mainid))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_maintain)
