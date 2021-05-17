import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import Data_roles from '../common/dataTables/data_roles';
import * as roleActions from "../../redux/actions/roleActions";
import {connect} from "react-redux";

export class Roles_list extends Component {
    constructor(props) {
        super(props);
        let listRoles = [];

        this.state = {
            open: false,
            roles: []
        };

        this.props.roles();

        setTimeout(() => {
            console.log(this.props.role.roles)
            let username

            this.props.role.roles.map(role => {
                // console.log(role.utilisateurs)
                role.utilisateurs.map(role => {
                    console.log('role',role.username)
                    username = role.username
                })
                let item = {
                    ID: role.id,
                    Name: role.name,
                    Description: role.description,
                    Users: username,
                }

                listRoles.push(item);
            })
            
            this.setState({
                roles: listRoles
            })
            
        }, 1000)

        this.state = {
            open: false,
            roles: listRoles
        };
    }
    render() {
        const {roles} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des rôles" parent="Rôles" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/roles/add-roles" className="btn btn-primary">Ajout de Rôle</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table role-list order-table coupon-list-delete">
                                <Data_roles
                                    multiSelectOption={true}
                                    myData={roles}
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
        role: state.role
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        roles: () => {dispatch( roleActions.roles())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles_list)
