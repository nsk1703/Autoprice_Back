import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_users from '../common/dataTables/data_users';
import * as userActions from "../../redux/actions/userActions";
import {connect} from "react-redux";

export class List_user extends Component {
    constructor(props) {
        super(props);
        let listUsers = [];

        this.state = {
            open: false,
            users: []
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

        this.state = {
            open: false,
            users: listUsers
        };
    }
    render() {
        const {users} = this.state
        // console.log(users)
        return (
            <Fragment>
                <Breadcrumb title="Liste des Utilisateurs" parent="Utilisateurs" />
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/users/create-user" className="btn btn-primary">Ajouter un utilisateur</Link>
                            </div>
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
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        users: () => {dispatch( userActions.users())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_user)
