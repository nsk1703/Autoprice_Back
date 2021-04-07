import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
// import Tabset_machine from './tabset-machine';

export class Change_profile extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Create User" parent="Users" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Add User</h5>
                                </div>
                                <div className="card-body">
                                    {/* <Tabset_machine /> */}
                                    <form className="needs-validation user-add" noValidate="">
                                        <h4>Account Details</h4>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Nom de Machine</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" >type :</label>
                                            <div className="col-xl-8 col-md-7">
                                                <select className="form-control digits" id="exampleFormControlSelect1">
                                                    <option>lorem</option>
                                                    <option>ipsum</option>
                                                    <option>dolar</option>
                                                    <option>vaug</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Lien</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Etat</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                                        </div>
                                        <div className="mt-5">
                                            <button type="button" className="btn btn-primary">Enregister</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Change_profile
