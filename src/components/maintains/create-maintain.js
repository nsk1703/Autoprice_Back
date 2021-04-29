import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_maintain from './tabset-maintain';
import CKEditors from 'react-ckeditor-component';
import * as maintenanceActions from "../../redux/actions/maintenanceActions";
import {connect} from "react-redux";
import * as machineActions from "../../redux/actions/machineActions";
import Select from 'react-select';

const choices = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]

export class Create_maintain extends Component {
        constructor(props) {
        super(props);
        let options = []
        let listMachines = []

        this.state = {
            open: false,
            nom: '',
            type: '',
            dateMaintenance: '',
            montant: '',
            description: '',
            machine_id: '',
            AllOptions: [],

        };

        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        // this.handleCkeditorChange = this.handleCkeditorChange.bind(this)

        this.props.machines();

        setTimeout(() => {
            console.log(this.props.machine.machines)

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
        this.state = {
            open: false,
            AllOptions: options
        };
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

    handleSubmitChange = (e) => {
        e.preventDefault();
        // console.log(this.state.AllOptions)
        this.props.newMaintenance(this.state)

        setTimeout(()=> {
            console.log(this.props.addmaintenance.success)
            if(this.props.addmaintenance.success === true){
                this.props.history.push('/maintains/list-maintain');
            }else{
                this.props.history.push('/maintains/create-maintain');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
       

    }
    render() {
        const {AllOptions, nom, type, montant, dateMaintenance, description, machine_id, isLoading} = this.state

        return (
            <Fragment>
                <Breadcrumb title="Effectuer une maintenance" parent="Maintenance" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Effectuer une maintenance</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add" noValidate="">
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
                                            id="validationCustom1" type="date" 
                                            name='dateMaintenance'
                                            value={dateMaintenance}
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
                                                    <textarea className=" form-control col-xl-8 col-md-7" name="description" value={description} 
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
                                            >Enregister</button>
                                        </div>
                                    </form>
                                </div>
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
        addmaintenance: state.addmaintenance,
        machine: state.machine
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newMaintenance: (maintenance) => {dispatch( maintenanceActions.newMaintenance(maintenance))},
        machines: () => {dispatch( machineActions.machines())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_maintain)
