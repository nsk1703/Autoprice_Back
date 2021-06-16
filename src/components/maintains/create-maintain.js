import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import CKEditors from 'react-ckeditor-component';
import * as maintenanceActions from "../../redux/actions/maintenanceActions";
import {connect} from "react-redux";
import * as machineActions from "../../redux/actions/machineActions";
import * as pieceActions from "../../redux/actions/pieceActions";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

const choices = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]

export class Create_maintain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            nom: '',
            type: '',
            dateMaintenance: '',
            montant: '',
            description: '',
            piece_id: '',
            machine_id: '',
            AllMachines: [],
            AllPieces: [],
            isLoading: false,
            visible: false,
            roles: null,
            loading: false

        };

        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePieceChange = this.handlePieceChange.bind(this)
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

    handlePieceChange = (piece_id) => {
        this.setState({piece_id});        
    }

    handleSelect = (type) => {
        this.setState({ type })   
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        // console.log(this.state.AllMachines)
        this.setState({
            isLoading: true
        })
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

    componentDidMount = () => {
        let options = [];
        let listPieces = [];
        let listMachines = []
        let rol = null;

        this.setState({
            loading: true
        })
        this.props.pieces();

        setTimeout(() => {
            this.props.piece.pieces.map(piece => {
                // console.log('i',piece.id)
                let item = {
                    id: piece.id,
                    Nom: piece.nom
                }
                listPieces.push(item);
            })
            
            listPieces.map(listPiece => {
                let option = 
                    {value:listPiece.id, label: listPiece.Nom }
                
                options.push(option)
            })
          
            this.setState({
                AllPieces: options
            })
        }, 1000)

        this.props.machines();

        setTimeout(() => {
            this.props.machine.machines.map(machine => {
                // console.log('i',machine.id)
                let item = {
                    id: machine.id,
                    Nom: machine.nom
                }
                listMachines.push(item);
            })
            
            listMachines.map(listMachine => {
                let option = 
                    {value:listMachine.id, label: listMachine.Nom }
                
                options.push(option)
            })
          
            this.setState({
                AllMachines: options
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterMaintenance;
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

    render() {
        const {loading, roles, visible ,AllMachines, AllPieces, nom, type, piece_id, montant, dateMaintenance, description, machine_id, isLoading} = this.state
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
                        <Breadcrumb title="Effectuer une maintenance" parent="Maintenance" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/maintains/list-maintain" 
                                                    className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
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
                                                        <Select
                                                            styles={customStyles} 
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
                                                        <Select
                                                            styles={customStyles} 
                                                            name="machine_id"
                                                            value={machine_id}
                                                            options={AllMachines}
                                                            onChange={this.handleChange}
                                                            required="" 
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" >Nom de Piece :</label>
                                                    {/* <div className="col-xl-8 col-md-7"> */}
                                                        <Select
                                                            styles={customStyles} 
                                                            name="piece_id"
                                                            value={piece_id}
                                                            options={AllPieces}
                                                            onChange={this.handlePieceChange}
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
                                                <ToastContainer />
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
    return {
        addmaintenance: state.addmaintenance,
        machine: state.machine,
        roledetails: state.roledetails,
        piece: state.piece
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newMaintenance: (maintenance) => {dispatch( maintenanceActions.newMaintenance(maintenance))},
        pieces: () => {dispatch( pieceActions.pieces())},
        machines: () => {dispatch( machineActions.machines())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_maintain)
