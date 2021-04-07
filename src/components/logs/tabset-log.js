import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import CKEditors from 'react-ckeditor-component';

export class Tabset_maintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link">Account</Tab>
                        {/* <Tab className="nav-link">Permission</Tab> */}
                    </TabList>
                    <TabPanel>
                        <form className="needs-validation user-add" noValidate="">
                            <h4>Account Details</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Nom</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="number" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Date d'</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom1" type="date" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Etat</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom3" type="text" required="" />
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
                                <label className="col-xl-3 col-md-4" >Numero de machine :</label>
                                <div className="col-xl-8 col-md-7">
                                    <select className="form-control digits" id="exampleFormControlSelect1">
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-md-4">Description :</label>
                                    <div className="col-xl-8 col-md-7 description-sm">
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
                        </form>
                    </TabPanel>
                    {/* <TabPanel>
                        <form className="needs-validation user-add" noValidate="">
                            <div className="permission-block">
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
                            </div>
                        </form>
                    </TabPanel> */}
                </Tabs>
                <div className="pull-right">
                    <button type="button" className="btn btn-primary">Enregistrer</button>
                </div>
            </Fragment>
        )
    }
}

export default Tabset_maintain
