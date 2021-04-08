import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_roles from '../common/dataTables/data_roles';

export class Roles_list extends Component {
    render() {
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
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_roles
                                    multiSelectOption={true}
                                    myData={data}
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

export default Roles_list
