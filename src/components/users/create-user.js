import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_user from './tabset-user';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as roleActions from "../../redux/actions/roleActions";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";

export class Create_user extends Component {
    constructor(props){
        super(props)

        this.state = {
            lastName: '',
            username: '',
            email: '',
            role_id: '',
            password: '',
            confirm_password: '',
            AllOptions: [],
            isLoading: false,
            active: '1',
            desactive: '0',
            etat: '0',
            roles: null,
            visible: false,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelect = (role_id) => {
        this.setState({role_id});        
    }

    handleSubmitChange = (e) => {
        e.preventDefault();

        this.setState({
            isLoading: true
        })
        // console.log(this.state)
        this.props.newUser(this.state)

        setTimeout(()=> {
            // console.log(this.props.adduser.success)
            if(this.props.adduser.success === true){
                this.props.history.push('/users/list-user');
            }else{
                this.props.history.push('/users/create-user');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)

    }

    componentDidMount = () => {
        let options= [];
        let listRoles= [];
        let rol = null;

        this.setState({
            loading: true
        })

        this.props.roles();
        // console.log(this.state)
        setTimeout(() => {
            // console.log(this.props.role.roles)

            this.props.role.roles.map(role => {
                let item = {
                    id: role.id,
                    Name: role.name
                }
                listRoles.push(item);
            })
            
            // console.log('rol',listRoles)
            listRoles.map(listRole => {
                let option = 
                    {value:listRole.id, label: listRole.Name}
                
                // console.log('opt',option)
                options.push(option)
            })
            // console.log('opts',options)
          
            this.setState({
                AllOptions: options
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))
        
        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterUtilisateur;
            })
            if(this.props.roledetails.role[0].listeUtilisateur == '1'){
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
        const {loading, visible, roles, AllOptions, active, desactive, etat, lastName, username, email, role_id, isLoading, password, confirm_password} = this.state
        // console.log(this.state.etat)
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
                        <Breadcrumb title="Ajout d'un Utilisateur" parent="Utilisateurs" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/users/list-user" 
                                                    className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation user-add">
                                                <div className="attribute-blocks">
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Etat</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="ido-eni1" 
                                                                        type="radio" name="etat"
                                                                        value={active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={etat === active} 
                                                                    />
                                                                    Actif
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="ido-eni2" 
                                                                        type="radio" name="etat" 
                                                                        value={desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={etat === desactive}
                                                                    />
                                                                    Inactif
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Last Name</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text"
                                                    name='lastname'
                                                    value={lastName}
                                                    onChange={this.handleInputChange} 
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> username</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom1" type="text" 
                                                    name='username'
                                                    value={username}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Email</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom2" type="email" 
                                                    name='email'
                                                    value={email}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" ><span>*</span> Role</label>
                                                    {/* <div className="col-xl-8 col-md-7"> */}
                                                        <Select className="col-xl-8 col-md-7"
                                                            name="role_id"
                                                            value={role_id}
                                                            options={AllOptions}
                                                            onChange={this.handleSelect}
                                                            required="" 
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Password</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom3" type="password" 
                                                    name='password'
                                                    value={password}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Confirm Password</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom4" type="password" 
                                                    name='confirm_password'
                                                    value={confirm_password}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <ToastContainer />
                                                <div className="offset-xl-3 offset-sm-4 mt-3">
                                                    <button type="button" 
                                                        className="btn btn-primary"
                                                        onClick={this.handleSubmitChange}
                                                        disabled={isLoading}
                                                    >Enregistrer
                                                    </button>
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
        adduser: state.adduser,
        role: state.role,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newUser: (user) => {dispatch( userActions.newUser(user))},
        roles: () => {dispatch( roleActions.roles())},
        actionsdetailRole: (rolename) => {dispatch( roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_user)