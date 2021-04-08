import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Breadcrumb from '../common/breadcrumb';
import CKEditors from 'react-ckeditor-component';

export class Add_roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <Fragment>    
                <Breadcrumb title="Ajouter un rôle " parent="Rôles" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Ajouter un rôle</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add" noValidate="">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Titre :</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Description :</label>
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
                                        <div className="attribute-blocks">
                                            <h5 className="f-w-600 mb-3">Product Related Permission </h5>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Add Product</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block">
                                                            <input className="radio_animated" id="edo-ani1" type="radio" name="rdo-ani" />
                                                            Allow
                                                            </label>
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani2" type="radio" name="rdo-ani" defaultChecked />
                                                            Deny
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Update Product</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani3" type="radio" name="rdo-ani1" defaultChecked />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block">
                                                            <input className="radio_animated" id="edo-ani4" type="radio" name="rdo-ani1" />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Delete Product</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani5" type="radio" name="rdo-ani2" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani6" type="radio" name="rdo-ani2" defaultChecked />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label className="mb-0 sm-label-radio">Apply Discount</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated pb-0">
                                                        <label className="d-block mb-0" >
                                                            <input className="radio_animated" id="edo-ani7" type="radio" name="rdo-ani3" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block mb-0" >
                                                            <input className="radio_animated" id="edo-ani8" type="radio" name="rdo-ani3" defaultChecked />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="attribute-blocks">
                                            <h5 className="f-w-600 mb-3">Category Related Permission </h5>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Add Category</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani9" type="radio" name="rdo-ani4" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani10" type="radio" name="rdo-ani4" defaultChecked />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Update Category</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani11" type="radio" name="rdo-ani5" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani12" type="radio" name="rdo-ani5" defaultChecked />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label>Delete Category</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani13" type="radio" name="rdo-ani6" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block" >
                                                            <input className="radio_animated" id="edo-ani14" type="radio" name="rdo-ani6" defaultChecked />
                                                            Deny
                                                            </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-3 col-sm-4">
                                                    <label className="mb-0 sm-label-radio">Apply Discount</label>
                                                </div>
                                                <div className="col-xl-9 col-sm-8">
                                                    <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                        <label className="d-block mb-0" >
                                                            <input className="radio_animated" id="edo-ani15" type="radio" name="rdo-ani7" />
                                                            Allow
                                                                        </label>
                                                        <label className="d-block mb-0" >
                                                            <input className="radio_animated" id="edo-ani16" type="radio" name="rdo-ani7" defaultChecked />
                                                            Deny
                                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <button type="button" className="btn btn-primary">Enregistrer</button>
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

export default Add_roles
