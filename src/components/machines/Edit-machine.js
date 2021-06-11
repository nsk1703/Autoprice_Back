import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Select from 'react-select';
import * as machineActions from "../../redux/actions/machineActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Redirect, Router } from 'react-router-dom';
import * as roleActions from "../../redux/actions/roleActions";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const options = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]
export class Edit_machine extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            open: false,
            id: null,
            nom: '',
            type: '',
            localisation: '',
            lien: '',
            montant: '',
            description: '',
            isLoading: false,
            visible: false,
            roles: null,
            loading: false
            
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
    handleChange = (type )=> {
        this.setState({type});
    }

    componentDidMount = () => {
        let param = this.props.match.params.id
        let rol = null

        this.setState({
            loading: true
        })
        this.props.machineDetail(param)

        setTimeout(() => {
            console.log('machdetails',this.props.machdetails.machine.machine)

            let type = {value: this.props.machdetails.machine.machine.type,
                label: this.props.machdetails.machine.machine.type}

            this.setState({
                id: this.props.machdetails.machine.machine.id,
                nom: this.props.machdetails.machine.machine.nom,
                type: type,
                localisation: this.props.machdetails.machine.machine.localisation,
                lien: this.props.machdetails.machine.machine.lien,
                montant: this.props.machdetails.machine.machine.montant,
                description: this.props.machdetails.machine.machine.description
            })
        }, 1000) 
        
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierMachine;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeMachine == '1'){
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
        this.props.editMachine(this.state)
        setTimeout(() => {
            // console.log(this.props.editmachine.isUpdated)
            // console.log(this.props.editmachine.isUpdated.isUpdated)
            if(this.props.editmachine.isUpdated.isUpdated === true){
                this.props.history.push('/machines/list-machine');
            }else{
                
                this.props.history.push('/machines/edit-machine/'+this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }

    render() {
        const {loading, roles, visible, isLoading, nom, type, localisation, lien, montant, description} = this.state
        // console.log(options)
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
                        <Breadcrumb title="Modifier une machine " parent="Machines / Liste des Machines" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/machines/list-machine" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation" encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Nom de Machine</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text" 
                                                    name="nom"
                                                    value={nom}
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
                                                        onChange={this.handleChange}
                                                        options={options}
                                                        required="" 
                                                    />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" >Localisation :</label>
                                                    {/* <div className=""> */}
                                                    <input className="form-control col-xl-8 col-md-7"
                                                        id="validationCustom0"
                                                        type="text" 
                                                        name="localisation"
                                                        value={localisation}
                                                        onChange={this.handleInputChange}
                                                        required="" 
                                                    />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text" 
                                                    name="montant"
                                                    value={montant}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Lien</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    name="lien"
                                                    value={lien}
                                                    id="validationCustom2" type="text" 
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4">Description du produit :</label>
                                                    {/* <div className="form-control col-xl-8 col-md-7 description-sm"> */}
                                                        <textarea className=" form-control col-xl-8 col-md-7" 
                                                        name="description" value={description} 
                                                            onChange={this.handleInputChange}
                                                            rows="10" cols="92"
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <ToastContainer />
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="button" 
                                                    className="btn btn-primary"
                                                    disabled={isLoading}
                                                    onClick={this.handleSubmitChange}
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

const mapStateToProps = (state) => {
    return {
        editmachine: state.editmachine,
        machdetails: state.machdetails,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editMachine: (machine) => {dispatch( machineActions.editMachine(machine))},
        machineDetail: (paramID) => {dispatch( machineActions.machineDetail(paramID))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit_machine))