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

export class Edit_user extends Component {

    constructor(props){
        super(props);

        this.state = {
            active: '1',
            desactive:'0',
            loading: false,

            id: '',
            etat: '0',
            lastName: '',
            username: '',
            email: '',
            role_id: '',
            password: '',
            confirm_password: '',
            AllOptions: [],
            isLoading: false,
            visible: false,
            roles: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
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
        // console.log(this.state.AllOptions)
        this.setState({
            isLoading: true
        })
        this.props.editUser(this.state)

        setTimeout(()=> {
            // console.log(this.props.edituser.success)
            if(this.props.edituser.success === true){
                this.props.history.push('/users/list-user');
            }else{
                this.props.history.push('/users/edit-user/'+this.state.id);
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

        setTimeout(() => {
            this.props.role.roles.map(role => {
                let item = {
                    id: role.id,
                    Name: role.name
                }
                listRoles.push(item);
            })
            
            listRoles.map(listRole => {
                let option = 
                    {value:listRole.id, label: listRole.Name}
                
                options.push(option)
            })          
            this.setState({
                AllOptions: options
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierUtilisateur;
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

        this.props.detailUser(this.props.match.params.id)
        // console.log('role', role)
        setTimeout(() => {
            // let role = {value: this.props.userdetails.user.role_id.id, 
            //                label: this.props.userdetails.user.role_id.nom}

            console.log(this.props.userdetails)
            // this.setState({
            //     id: this.props.userdetails.user.id,
            //     quantite: this.props.userdetails.user.quantite,
            //     description: this.props.userdetails.user.description,
            //     role_id: role
            // })
        }, 1000)
    }

    render() {
        const {loading, roles, visible, AllOptions, lastName, username, email, role_id, isLoading, password, confirm_password} = this.state
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
                        <Breadcrumb title="Modification d'un Utilisateur" parent="Utilisateurs" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                                (
                                                    <div className="card-header">
                                                        <Link type="button" to="/users/list-user" className="btn btn-primary">Retour</Link>
                                                    </div>
                                                ):
                                                null
                                            }
                                        <div className="card-body">
                                            <form className="needs-validation user-edit" noValidate="">
                                                <div className="attribute-blocks">
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Etat</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani1" 
                                                                        type="radio" name="etat"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.etat === this.state.active} 
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani2" 
                                                                    type="radio" name="etat" 
                                                                    value={this.state.desactive}
                                                                    onChange={this.handleInputChange}
                                                                    checked={this.state.etat === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" > Role</label>
                                                    {/* <div className="col-xl-8 col-md-7"> */}
                                                        <Select
                                                            styles={customStyles}
                                                            name="role_id"
                                                            value={role_id}
                                                            options={AllOptions}
                                                            onChange={this.handleSelect}
                                                            required="" 
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <ToastContainer />
                                                <div className="offset-xl-3 offset-sm-4 mt-3">
                                                    <button type="button" 
                                                        className="btn btn-primary"
                                                        onClick={this.handleSubmitChange}
                                                        disabled={isLoading}
                                                    >Save
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
        edituser: state.edituser,
        role: state.role,
        userdetails: state.userdetails,
        roledetails: state.roledetails,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editUser: (user) => {dispatch( userActions.editUser(user))},
        roles: () => {dispatch( roleActions.roles())},
        detailUser: (user)  => {dispatch( userActions.detailUser(user))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_user)
