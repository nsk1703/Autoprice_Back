import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'


export class List_machine extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Liste des machines" parent="Machines" />
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/machines/create-machine" className="btn btn-primary">Ajout de Machine</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Datatable
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

export default List_machine
