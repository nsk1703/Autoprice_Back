import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import * as machineActions from "../../../redux/actions/machineActions";
import { withRouter, Redirect, Router } from 'react-router-dom';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as appromonnaieActions from '../../../redux/actions/appromonnaieActions';
import Select from 'react-select';

export class Edit_currency extends Component {
    
    constructor(props) {
        super(props); 

        let options = []
        let listMachines = []
        
            this.state = {
                isLoading: false,
                open: false,
                id: null,
                quantite: '',
                description: '',
                machine_id:  '',
                AllOptions: []
            };
        // })
        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

        this.props.machines();

        setTimeout(() => {
            // console.log(this.props.machine.machines)

            this.props.machine.machines.map(machine => {
                let item = {
                    id: machine.id,
                    Nom: machine.nom
                }
                listMachines.push(item);
            })
            
            // console.log('maaa',listMachines)
            listMachines.map(listMachine => {
                let option = 
                    {value:listMachine.id, label: listMachine.Nom }
                
                options.push(option)
            })
          
            this.setState({
                AllOptions: options
            })
        }, 1000)
        this.state = {
            open: false,
            AllOptions: options
        };
        
    }
    
    componentDidMount = () => {
        // console.log(this.props.match.params.id)
        
        this.props.detailAppromonnaie(this.props.match.params.id)
        // console.log('machine', machine)

        setTimeout(() => {
            let machine = {value: this.props.appromondetails.appromonnaie.appromonnaie.machine_id.id, 
                           label: this.props.appromondetails.appromonnaie.appromonnaie.machine_id.nom}

            console.log(this.props.appromondetails.appromonnaie.appromonnaie.quantite)
            this.setState({
                id: this.props.appromondetails.appromonnaie.appromonnaie.id,
                quantite: this.props.appromondetails.appromonnaie.appromonnaie.quantite,
                description: this.props.appromondetails.appromonnaie.appromonnaie.description,
                machine_id: machine
            })
        }, 1000)

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleChange = (machine_id) => {
        this.setState({machine_id});        
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.editAppromonnaie(this.state);
        setTimeout(()=> {
            console.log(this.props.editappromonnaie)
            if(this.props.editappromonnaie.isUpdated.isUpdated === true){
                this.props.history.push('/supply/currency/list-currency');
            }else{
                this.props.history.push('/supply/currency/edit-currency/'+this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)

    }

    render() {
        const {AllOptions, quantite, description, machine_id, isLoading} =this.state
        return (
            <Fragment>
                <Breadcrumb title="Reajustement de Monnaie" parent="Monnaie" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Reajustement de Monnaie</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"> Montant (FCFA)</label>
                                            <input className="form-control col-xl-8 col-md-7"
                                            name="quantite" 
                                            value={quantite}
                                            onChange={this.handleInputChange}
                                            id="validationCustom1" type="number" 
                                            required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" >Nom de machine :</label>
                                            <Select className="col-xl-8 col-md-7"
                                                name="machine_id"
                                                value={machine_id}
                                                options={AllOptions}
                                                onChange={this.handleChange}
                                                required="" 
                                            />
                                            
                                        </div>
                                        <div className="form">
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-sm-4">Description :</label>
                                                {/* <div className="form-control col-xl-8 col-sm-7"> */}
                                                
                                                    <textarea className="form-control" name="description" value={description} 
                                                        onChange={this.handleInputChange}
                                                        rows="5" cols="92"
                                                />
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <ToastContainer />
                                        <div className="offset-xl-3 offset-sm-4">
                                            <button type="button" className="btn btn-primary"
                                                onClick={this.handleSubmitChange}
                                                disabled={isLoading}
                                            >
                                            Enregister</button>
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
    return{
        machine: state.machine,
        editappromonnaie: state.editappromonnaie,
        appromondetails: state.appromondetails
    }
    
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())},
        editAppromonnaie: (appromonnaie) => {dispatch(appromonnaieActions.editAppromonnaie(appromonnaie))},
        detailAppromonnaie: (moneyId) => {dispatch(appromonnaieActions.detailAppromonnaie(moneyId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit_currency))

