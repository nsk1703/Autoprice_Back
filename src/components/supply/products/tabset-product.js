import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
// import CKEditors from 'react-ckeditor-component';
import * as produitActions from "../../../redux/actions/productActions";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as approproduitActions from '../../../redux/actions/approproduitActions';
import Select from 'react-select';

export class Tabset_currency extends Component {
    constructor(props) {
        super(props); 
        let options = []
        let listproduits = []

        this.state = {
            
            open: false,
            quantite: '',
            description: '',
            produit_id: [],
            selectedOption: null,
            AllOptions: []
            
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange()
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleCkeditorChange = this.handleCkeditorChange.bind(this)

        this.props.produits();

        setTimeout(() => {
            console.log(this.props.product.products)

            this.props.product.products.map(product => {
                console.log('i',product.id)
                let item = {
                    id: product.product_id,
                    Nom: product.name
                }
                listproduits.push(item);
            })
            
            console.log('maaa',listproduits)
            // console.log(lis)
            listproduits.map(listproduit => {
                let option = 
                    {value:listproduit.id, label: listproduit.Nom }
                
                console.log(option)
                options.push(option)
            })
            console.log('11111',options)
          
            this.setState({
                AllOptions: options
            })
        }, 1000)
        this.state = {
            open: false,
            AllOptions: options
        };
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = selectedOption => {
        this.setState(
            {selectedOption},
            () => console.log('Option selected:', this.state.selectedOption)
        );
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
        // console.log(this.state.AllOptions)
        this.props.newApproproduits(this.state)
       

    }
    render() {
        const {AllOptions, quantite, produit_id, description, selectedOption} =this.state
        console.log("looo", AllOptions)
        
        return (
            <Fragment>
                <form className="needs-validation currency-add" noValidate="">
                    <div className="form-group row">
                        <label className="col-xl-3 col-md-4"> Montant (FCFA)</label>
                        <input className="form-control col-xl-8 col-md-7"
                        name="montant" 
                        value={quantite}
                        onChange={this.handleInputChange}
                        id="validationCustom1" type="number" 
                        required="" />
                    </div>
                    <div className="form-group row">
                        <label className="col-xl-3 col-md-4" >Nom de produit :</label>
                        <Select className="form-control col-xl-8 col-md-7"
                            name="produit_id"
                            value={selectedOption}
                            options={AllOptions}
                            onChange={this.handleChange}
                            required="" 
                        />
                         {/* <input className="form-control col-xl-8 col-md-7"
                            type="select"
                            name="produit" 
                            value={produit_id}
                            onChange={this.handleInputChange}
                            id="validationCustom1"
                            required=""
                         />  */}
                    </div>
                    <div className="form">
                        <div className="form-group row">
                            <label className="col-xl-3 col-sm-4">Description :</label>
                            <div className="form-control col-xl-8 col-sm-7">
                                {/* <CKEditor
                                    editor={ClassicEditor}
                                    data={description}
                                    onInit={ editor=>{
                                        
                                    }}
                                    onChange={this.handleCkeditorChange}
                                /> */}
                                <textarea name="description" value={description} onChange={this.handleInputChange}>
                                    
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    <div className="offset-xl-3 offset-sm-4">
                        <button type="button" className="btn btn-primary"
                                onClick={() => this.handleSubmitChange}
                        >
                        Enregister</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        approproduit: state.approproduit
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        produits: () => {dispatch( produitActions.products())},
        newApproproduits: (approproduit) => {dispatch(approproduitActions.newApproproduits(approproduit))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabset_currency)
