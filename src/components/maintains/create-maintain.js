import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_maintain from './tabset-maintain';
import CKEditors from 'react-ckeditor-component';

export class Create_maintain extends Component {
        constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Effectuer une maintenance" parent="Maintenance" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Effectuer une maintenance</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add" noValidate="">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Nom</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="number" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Date de Maintenance</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom1" type="date" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Etat</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom3" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" >type :</label>
                                            {/* <div className=""> */}
                                                <select className="form-control col-xl-8 col-md-7 digits" id="exampleFormControlSelect1">
                                                    <option>lorem</option>
                                                    <option>ipsum</option>
                                                    <option>dolar</option>
                                                    <option>vaug</option>
                                                </select>
                                            {/* </div> */}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" >Nom de machine :</label>
                                            {/* <div className="col-xl-8 col-md-7"> */}
                                                <select className="form-control col-xl-8 col-md-7 digits" id="exampleFormControlSelect1">
                                                    <option>machine01</option>
                                                    <option>machine02</option>
                                                    <option>machine03</option>
                                                    <option>machine04</option>
                                                </select>
                                            {/* </div> */}
                                        </div>
                                        <div className="form">
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-md-4">Description :</label>
                                                <div className=" form-control col-xl-8 col-md-7 description-sm">
                                                    <CKEditors
                                                        activeclassName="p10"
                                                        content={this.state.content}
                                                        events={{
                                                            "blur": this.onBlur,
                                                            "afterPaste": this.afterPaste,
                                                            "change": this.onChange
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="offset-xl-3 offset-sm-4">
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

export default Create_maintain
