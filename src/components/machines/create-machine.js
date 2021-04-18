import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import CKEditors from 'react-ckeditor-component';

export class Create_machine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Créer une machine " parent="Machines" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Créer une machine</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add" noValidate="">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Nom de Machine</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="text" required="" />
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
                                            <label className="col-xl-3 col-md-4"><span>*</span> Lien</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Etat</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Description du produit :</label>
                                            <div className="form-control col-xl-8 col-md-7 description-sm">
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

export default Create_machine