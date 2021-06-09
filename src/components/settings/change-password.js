import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
// import Tabset_machine from './tabset-machine';
import BeatLoader from "react-spinners/BeatLoader";

export class Change_password extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        },1000)
    }
    render() {
        if(this.state.loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={this.state.loading} size={50} />
                </div>
            )
        }else{
            return (
                <Fragment>
                    <Breadcrumb title="Modifier le mot de passe" parent="Paramètres" />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5> Modifier le mot de passe</h5>
                                    </div>
                                    <div className="card-body">
                                        <form className="needs-validation user-add" noValidate="">
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-md-4"><span>*</span> Ancien mot de passe :</label>
                                                <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="password" required="" />
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-md-4"><span>*</span> Nouveau mot de passe :</label>
                                                <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="password" required="" />
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-md-4"><span>*</span> Repéter le nouveau mot de passe :</label>
                                                <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="password" required="" />
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
}

export default Change_password
