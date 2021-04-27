import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Select from 'react-select';
import * as machineActions from "../../redux/actions/machineActions";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Redirect, Router } from 'react-router-dom';

// const options= [
    
// ]
export class Create_machine extends Component {
    constructor(props) {
        super(props);
        let options = []
        let listMachines = []
        this.state = {
            open: false,
            nom: '',
            type: null,
            lien: '',
            montant: '',
            description: '',
            isLoading: false,
            options: [
                {value: 'type1', label:'Type 1'},
                {value: 'type2', label:'Type 2'},
                {value: 'type3', label:'Type 3'}
            ]
            
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange()
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleCkeditorChange = this.handleCkeditorChange.bind(this)

        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
    handleChange = type => {

        this.setState({type});
        console.log('Option selected:', type)
    }
    handleCkeditorChange = (e, editor) => {
        const data = editor.getData()
        this.setState({
            description: data
        })
        console.log(this.state.description)
    } 
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        // console.log(this.state.AllOptions)
        this.props.newMachine(this.state)
        if(this.props.machine.success === true){
            this.props.history.push('/list-machine');
        }else{
            this.setState({
                isLoading: false
            })
        }
       

    }
    render() {
        const {isLoading, options, nom, type, lien, montant, description} =this.state
        console.log(options)
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
                                            <input className="form-control col-xl-8 col-md-7" 
                                            id="validationCustom0" type="text" 
                                            name="nom"
                                            value={nom}
                                            onChange={this.handleInputChange}
                                            required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" >type :</label>
                                            {/* <div className=""> */}
                                            <Select className=" col-xl-8 col-md-7"
                                                name="type"
                                                value={type}
                                                onChange={this.handleChange}
                                                options={options}
                                                required="" 
                                            />
                                            {/* </div> */}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                            <input className="form-control col-xl-8 col-md-7" 
                                            id="validationCustom0" type="text" 
                                            name="montant"
                                            value={montant}
                                            onChange={this.handleInputChange}
                                            required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Lien</label>
                                            <input className="form-control col-xl-8 col-md-7" 
                                            name="lien"
                                            value={lien}
                                            id="validationCustom2" type="text" 
                                            onChange={this.handleInputChange}
                                            required="" />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Description du produit :</label>
                                            <div className="form-control col-xl-8 col-md-7 description-sm">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={description}
                                                onInit={ editor=>{
                                                    
                                                }}
                                                onChange={this.handleCkeditorChange}
                                            />
                                            </div>
                                        </div>
                                        <div className="offset-xl-3 offset-sm-4">
                                            <button type="button" 
                                            className="btn btn-primary"
                                            disabled={isLoading}
                                            onClick={() => this.handleSubmitChange}
                                            >Enregister</button>
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

const mapStateToProps = (state) => {
    return {
        machine: state.machine,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newMachine: (machine) => {dispatch( machineActions.newMachine(machine))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create_machine))