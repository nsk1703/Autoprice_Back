import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
// import CKEditors from 'react-ckeditor-component';
import { withRouter, Redirect, Router } from 'react-router-dom';

import * as produitActions from "../../../redux/actions/productActions";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as approproduitActions from '../../../redux/actions/approproduitActions';
import Select from 'react-select';

export class Tabset_product extends Component {
    constructor(props) {
        super(props); 
        let options = []
        let listProducts = []

        this.state = {
            isLoading: false,
            open: false,
            quantite: '',
            description: '',
            product_id: '',
            AllOptions: []
            
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        // this.handleCkeditorChange = this.handleCkeditorChange.bind(this)

        this.props.products();

        setTimeout(() => {
            // console.log(this.props.product.products)

            this.props.product.products.map(product => {
                // console.log('i',product.id)
                let item = {
                    id: product.product_id,
                    Nom: product.name
                }
                listProducts.push(item);
            })
            
            // console.log('maaa',listProducts)
            // console.log(lis)
            listProducts.map(listProduct => {
                let option = 
                    {value:listProduct.id, label: listProduct.Nom }
                
                // console.log(option)
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

    handleChange = (product_id) => {
        this.setState({product_id});
    }

    // handleCkeditorChange = (e, editor) => {
    //     const data = editor.getData()
    //     this.setState({
    //         description: data
    //     })
    //     // console.log(this.state.description)
    // } 
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })        
        // console.log(this.state.AllOptions)
        this.props.newApproproduits(this.state)
       
        setTimeout(()=> {
            console.log(this.props.addapproproduit.success)
            if(this.props.addapproproduit.success === true){
                this.props.history.push('/supply/products/list-product');
            }else{
                this.props.history.push('/supply/products/create-product');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)

    }
    render() {
        const {AllOptions, quantite, product_id, description, isLoading} =this.state
        // console.log("looo", AllOptions)
        
        return (
            <Fragment>
                <form className="needs-validation product-add" noValidate="">
                    <div className="form-group row">
                        <label className="col-xl-3 col-md-4"> Quantité</label>
                        <input className="form-control col-xl-8 col-md-7"
                            name="quantite" 
                            value={quantite}
                            onChange={this.handleInputChange}
                            id="validationCustom1" type="number" 
                            required="" 
                        />
                    </div>
                    <div className="form-group row">
                        <label className="col-xl-3 col-md-4" >Nom de produit :</label>
                        <Select className="col-xl-8 col-md-7"
                            name="product_id"
                            value={product_id}
                            options={AllOptions}
                            onChange={this.handleChange}
                            required="" 
                        />
                    </div>
                    <div className="form">
                        <div className="form-group row">
                            <label className="col-xl-3 col-sm-4">Description :</label>
                            <textarea name="description" value={description} 
                                    onChange={this.handleInputChange}
                                    rows="5" cols="92"
                            />
                            {/* </div> */}
                        </div>
                    </div>
                    <ToastContainer />
                    <div className="offset-xl-3 offset-sm-4">
                        <button type="button" className="btn btn-primary"
                                onClick={this.handleSubmitChange}
                                disabled={isLoading}
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
        addapproproduit: state.addapproproduit
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        products: () => {dispatch( produitActions.products())},
        newApproproduits: (approproduit) => {dispatch(approproduitActions.newApproproduits(approproduit))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tabset_product))
