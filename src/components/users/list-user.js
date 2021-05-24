import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_users from '../common/dataTables/data_users';
import * as userActions from "../../redux/actions/userActions";
import {connect} from "react-redux";
import * as roleActions  from "../../redux/actions/roleActions";

export class List_user extends Component {
    constructor(props) {
        super(props);
        let listUsers = [];
        let rol = null

        this.state = {
            open: false,
            users: [],
            roles: null,
            visible: false
        };

        this.props.users();

        setTimeout(() => {
            console.log(this.props.user.users)
            let roleName

            this.props.user.users.map(user => {
                console.log(user.roles)
                user.roles.map(role => {
                    // console.log('role',role.id)
                    roleName = role.name
                })
                let item = {
                    ID: user.id,
                    Username: user.username,
                    Email: user.email,
                    Role: roleName,
                }

                listUsers.push(item);
            })
            
            this.setState({
                users: listUsers
            })
            
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.listeUtilisateur;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterUtilisateur == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)

        this.state = {
            open: false,
            users: listUsers,
            roles: rol
        };
    }
    render() {
        const {users, visible, roles} = this.state
        // console.log(users)
       if(roles == '1'){
            return (
                <Fragment>
                    <Breadcrumb title="Liste des Utilisateurs" parent="Utilisateurs" />
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                            {visible == true ?
                                (
                                    <div className="btn-popup pull-right">
                                        <Link to="/users/create-user" className="btn btn-primary">Ajouter un utilisateur</Link>
                                    </div>
                                ):
                                null
                            }
                                <div className="clearfix"></div>
                                <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                    <Data_users
                                        multiSelectOption={true}
                                        myData={users}
                                        check={true}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                    />
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        users: () => {dispatch( userActions.users())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_user)
