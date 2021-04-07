import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_slide from './tabset-slide';

export class Create_slide extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Ajouter un slide" parent="Slides" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Ajouter un slide</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add" noValidate="">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Format</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" ><span>*</span> type :</label>
                                            {/* <div className="col-xl-8 col-md-7"> */}
                                                <select className="form-control col-xl-8 col-md-7 digits" id="exampleFormControlSelect1">
                                                    <option>lorem</option>
                                                    <option>ipsum</option>
                                                    <option>dolar</option>
                                                    <option>vaug</option>
                                                </select>
                                            {/* </div> */}
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="message-text" className="col-form-label"><span>*</span>Image de Catégorie :</label>
                                            <input className="form-control" id="validationCustom02" type="file" />
                                        </div>
                                        <div className="pull-right">
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

export default Create_slide
