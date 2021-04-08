import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
// import Tabset_machine from './tabset-machine';

export class Change_profile extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Modifier le profil" parent="Profil" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Modifier le profil</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation update-profile" noValidate="">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Username :</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="text" required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Email :</label>
                                            <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="email" required="" />
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
