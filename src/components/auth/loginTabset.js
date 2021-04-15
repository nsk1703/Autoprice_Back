import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter, Redirect, Router } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import {auth} from '../../redux/reducers/userReducers'
import { authConstants } from '../../constants/userConstants';
import * as userActions  from "../../redux/actions/userActions";
import { connect } from 'react-redux';  
import { ToastContainer, toast } from 'react-toastify';


export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            loading: false,
            isLoading: false
        }
        // console.log(props.user)

        this.handleChange = this.handleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        // this.handleInputChangePassword = this.handleInputChangePassword.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    
    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        });
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleInputChangePassword = (e) => {
    //     e.preventDefault()
    //     this.setState({
    //         password: e.target.value
    //     })
    // }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.login(this.state)
        setTimeout(() =>{
            console.log(this.props.user.isAuthenticated)
            if(this.props.user.isAuthenticated == true){
                this.props.history.push('/');
            }else{
                this.props.history.push('/login');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000);

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        this.props.register(this.state);
        setTimeout(() => {
            if(this.props.user.isRegistered == true){
                this.props.history.push('/login');
            }else{
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }

    render() {
        const {isLoading, email, username, password, confirm_password} = this.state
        return (
            <div>
                <Fragment>
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon justify-content-center" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Connexion</Tab>
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Register</Tab>
                        </TabList>

                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.handleSubmitChange}>
                                <div className="form-group">
                                    <input required="" 
                                    name="username"
                                     value={username} 
                                    onChange={this.handleInputChange}
                                    type="text" className="form-control" 
                                    placeholder="Nom d'utilisateur" id="exampleInputEmail1" />
                                </div>
                                <div className="form-group">
                                    <input required="" 
                                    name="password"
                                     value={password} 
                                    onChange={this.handleInputChange} 
                                    type="password" className="form-control" placeholder="Mot de Passe" />
                                </div>
                                {/* <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                        </label>
                                    </div>
                                </div> */}
                                    
                                
                                {/* <div className="form-footer">
                                    <span>Or Login up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div> */}
                                <ToastContainer />
                            </form>
                            <button className="btn btn-primary" disabled={isLoading} onClick={this.handleSubmitChange} >
                                Connexion
                            </button>
                        </TabPanel>
                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input required="" name="username" 
                                    type="text" className="form-control" 
                                    placeholder="Username" id="exampleInputEmail12" 
                                    value={username} onChange={this.onChange}
                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <input required="" name="email" 
                                    type="email" className="form-control" 
                                    placeholder="Email" id="exampleInputEmail13" 
                                    value={email} onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input required="" name="password" 
                                    type="password" className="form-control" 
                                    placeholder="Password" 
                                    value={password} onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input required="" name="confirm_password" 
                                    type="password" className="form-control" 
                                    placeholder="Confirm Password" 
                                    value={confirm_password} onChange={this.onChange}
                                    />
                                </div>
                                {/* <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            I agree all statements in <span><a href="">Terms &amp; Conditions</a></span>
                                        </label>
                                    </div>
                                </div> */}
                                <ToastContainer />
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" disabled={isLoading}
                                    //  onClick={() => this.onSubmit}
                                     >Inscription</button>
                                </div>
                                {/* <div className="form-footer">
                                    <span>Or Sign up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div> */}
                            </form>
                        </TabPanel>
                    </Tabs>
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        login: (user) => {dispatch( userActions.login(user))},
        register: (user) => {dispatch(userActions.register(user))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginTabset))



