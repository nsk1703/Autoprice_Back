import React, { Component,Fragment } from 'react'
import {Link, Redirect} from 'react-router-dom'

//images import
import user_man from '../../../assets/images/dashboard/user_man.png'
export class User_menu extends Component {
    constructor(props){
        super(props)

        this.handleDisconnectChange = this.handleDisconnectChange.bind(this)
        
    }

    handleDisconnectChange = () => {
        window.location.reload()
        localStorage.clear();
    }

    render() {
        return (
            <Fragment>
                <li className="onhover-dropdown">
                    <div className="media align-items-center">
                        <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={user_man} alt="header-user" />
                        <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <li><Link to={`${process.env.PUBLIC_URL}/settings/profile`} ><i data-feather="user"></i>Profil</Link></li>
                        <li><Link to={`${process.env.PUBLIC_URL}/settings/change-profile`} ><i data-feather="change-profile"></i>Modifier le Profil</Link></li>
                        {/* <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li> */}
                        {/* <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li> */}
                        {/* <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li> */}
                        <li><Link to={`${process.env.PUBLIC_URL}/settings/change-password`} ><i data-feather="change-password"></i>Modifier le mot de passe</Link></li>
                        <li>
                            <Link to={`${process.env.PUBLIC_URL}/login`} 
                                onClick={this.handleDisconnectChange}>
                            <i data-feather="log-out"></i>
                                Déconnexion
                            </Link>
                        </li>
                    </ul>
                </li>
                {/*  */}
            </Fragment>
        )
    }
}

export default User_menu
