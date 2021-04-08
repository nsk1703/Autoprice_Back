import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_users from '../common/dataTables/data_users';


export class List_user extends Component {
    render() {
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
                                <Link to="/users/create-user" className="btn btn-primary">Créer un utilisateur</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_users
                                    multiSelectOption={true}
                                    myData={data}
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

export default List_user
