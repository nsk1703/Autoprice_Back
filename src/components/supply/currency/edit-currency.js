import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import * as machineActions from "../../../redux/actions/machineActions";
import { withRouter, Redirect, Router } from 'react-router-dom';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as appromonnaieActions from '../../../redux/actions/appromonnaieActions';
import Select from 'react-select';
import * as roleActions from "../../../redux/actions/roleActions";
import { Link } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

export class Edit_currency extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            isLoading: false,
            open: false,
            id: null,
            quantite: '',
            description: '',
            machine_id:  '',
            AllOptions: [],
            visible: false,
            roles: null,
            loading: false
        };
        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }
    
    componentDidMount = () => {
        let rol = null
        let options = [];
        let listMachines = [];

        this.setState({
            loading: true
        })

        this.props.machines();

        setTimeout(() => {
            this.props.machine.machines.map(machine => {
                let item = {
                    id: machine.id,
                    Nom: machine.nom
                }
                listMachines.push(item);
            })
            
            listMachines.map(listMachine => {
                let option = {value:listMachine.id, label: listMachine.Nom }
                options.push(option)
            })
          
            this.setState({
                AllOptions: options
            })
        }, 1000)
        
        this.props.detailAppromonnaie(this.props.match.params.id)

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

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierApproMonnaie;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeApproMonnaie == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                loading: false
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
        const {loading, roles, visible, AllOptions, quantite, description, machine_id, isLoading} =this.state
        const customStyles = {
            input: (provided, state) => ({
                ...provided,
                margin: '0px',
                width: '715px'
            }),
        }
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
                        <Breadcrumb title="Reajustement de Monnaie" parent="Monnaie" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/supply/currency/list-currency" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
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
                                                    <Select
                                                        styles={customStyles}
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
                                                        <textarea className="form-control col-xl-8 col-md-7" 
                                                            name="description" 
                                                            value={description} 
                                                            onChange={this.handleInputChange}
                                                            rows="8" cols="92"
                                                        />
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
            }else{
                return(
                    <Fragment>

                    </Fragment>
                )
            }
        }
    }
}
const mapStateToProps = (state) => {
    return{
        machine: state.machine,
        editappromonnaie: state.editappromonnaie,
        appromondetails: state.appromondetails,
        roledetails: state.roledetails,
    }
    
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())},
        editAppromonnaie: (appromonnaie) => {dispatch(appromonnaieActions.editAppromonnaie(appromonnaie))},
        detailAppromonnaie: (moneyId) => {dispatch(appromonnaieActions.detailAppromonnaie(moneyId))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit_currency))

