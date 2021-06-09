import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Select from 'react-select';
import * as machineActions from "../../redux/actions/machineActions";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Redirect, Router } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

const options = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]
export class Create_machine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            nom: '',
            type: null,
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
        // console.log('Option selected:', type)
    }
    
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        // console.log(this.state.AllOptions)
        this.props.newMachine(this.state)
        setTimeout(() => {
            // console.log(this.props.addmachine.success)
            if(this.props.addmachine.success === true){
                this.props.history.push('/machines/list-machine');
            }else{
                this.props.history.push('/machines/create-machine');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
       

    }

    componentDidMount = () => {
        let rol = null;

        this.setState({
            loading: true
        })
        
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterMachine;
            })
            if(this.props.roledetails.role[0].listeMachine == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                roles: rol,
                loading: false
            })
        }, 1000)

    }

    render() {
        const {loading, roles, visible, isLoading, nom, type, lien, montant, description} = this.state
        // console.log(options)
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
                        <Breadcrumb title="Créer une machine " parent="Machines" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/machines/list-machine" 
                                                    className="btn btn-primary">Retour</Link>
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
                                                    <Select className="col-xl-8 col-md-7"
                                                        name="type"
                                                        value={type}
                                                        onChange={this.handleChange}
                                                        options={options}
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
        addmachine: state.addmachine,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newMachine: (machine) => {dispatch( machineActions.newMachine(machine))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create_machine))