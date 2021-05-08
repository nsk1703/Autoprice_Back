import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
// import CKEditors from 'react-ckeditor-component';
import { withRouter, Redirect, Router } from 'react-router-dom';
import Breadcrumb from '../../common/breadcrumb';
import * as produitActions from "../../../redux/actions/productActions";
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

            id: null,
            quantite: '',
            description: '',
            productId: '',
            AllOptions: []
            
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

        this.props.products();

        setTimeout(() => {

            this.props.product.products.map(product => {
                // console.log('i',product.product_id)
                let item = {
                    id: product.product_id,
                    Nom: product.name
                }
                listProducts.push(item);
            })
            
            // console.log('maaa',listProducts)

            listProducts.map(listProduct => {
                let option = 
                    {value:listProduct.id, label: listProduct.Nom }
                
                // console.log(option)
                options.push(option)
            })
            // console.log('11111',options)
          
            this.setState({
                AllOptions: options
            })
        }, 1000)
        this.state = {
            open: false,
            AllOptions: options
        };
    }

    componentDidMount = () => {
        // console.log(this.props.match.params.id)
        this.props.detailApproproduit(this.props.match.params.id)

        setTimeout(() => {
            let product = {value: this.props.approprodetails.approproduit.approproduit.productId.product_id, 
                           label: this.props.approprodetails.approproduit.approproduit.productId.name}

            this.setState({
                id: this.props.approprodetails.approproduit.approproduit.id,
                quantite: this.props.approprodetails.approproduit.approproduit.quantite,
                description: this.props.approprodetails.approproduit.approproduit.description,
                productId: product
            })
        }, 1000)

        
        // console.log('product', product)
        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = (productId) => {
        this.setState({productId});
    }
 
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })        
        // console.log(this.state.AllOptions)
        this.props.editApproproduits(this.state)
       
        setTimeout(()=> {
            console.log(this.props.editapproproduit.isUpdated)
            
            if(this.props.editapproproduit.isUpdated.isUpdated === true){
                this.props.history.push('/supply/products/list-product');
            }else{
                this.props.history.push('/supply/products/edit-product/'+this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)

    }

    render() {
        const {AllOptions, quantite, productId, description, isLoading} =this.state
        // console.log("looo", AllOptions)
        
        return (
            <Fragment>
                <Breadcrumb title="Reajustement du Produit" parent="Produit" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Reajustement du Produit</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation product-edit" noValidate="">
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
                                            <Select className="form-control col-xl-8 col-md-7"
                                                name="productId"
                                                value={productId}
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
        product: state.product,
        editapproproduit: state.editapproproduit,
        approprodetails: state.approprodetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        products: () => {dispatch( produitActions.products())},
        editApproproduits: (approproduit) => {dispatch(approproduitActions.editApproproduits(approproduit))},
        detailApproproduit: (productId) => {dispatch(approproduitActions.detailApproproduit(productId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tabset_product))
