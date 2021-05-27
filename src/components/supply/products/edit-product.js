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
import * as roleActions from "../../../redux/actions/roleActions";
import { Link } from 'react-router-dom'

export class Tabset_product extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            isLoading: false,
            open: false,

            id: null,
            quantite: '',
            description: '',
            productId: '',
            AllOptions: [],
            visible: false,
            roles: null,
            
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    componentDidMount = () => {
        let options = [];
        let listProducts = [];
        let rol = null

        this.props.products();

        setTimeout(() => {

            this.props.product.products.map(product => {
                let item = {
                    id: product.product_id,
                    Nom: product.name
                }
                listProducts.push(item);
            })
            
            listProducts.map(listProduct => {
                let option = {value:listProduct.id, label: listProduct.Nom }
                
                options.push(option)
            })
          
            this.setState({
                AllOptions: options
            })
        }, 1000)

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

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierApproProduit;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeApproProduit == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)

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
        const {roles, visible, AllOptions, quantite, productId, description, isLoading} = this.state
        
        if(roles == '1'){
            return (
                <Fragment>
                    <Breadcrumb title="Reajustement du Produit" parent="Approvisionnement / Produit Approvisionnés" />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    {visible == true ?
                                        (
                                            <div className="card-header">
                                                <Link type="button" to="/supply/products/list-product" className="btn btn-primary">Retour</Link>
                                            </div>
                                        ):
                                        null
                                    }
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
        }else{
            return(
                <Fragment>

                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        editapproproduit: state.editapproproduit,
        approprodetails: state.approprodetails,
        roledetails: state.roledetails,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        products: () => {dispatch( produitActions.products())},
        editApproproduits: (approproduit) => {dispatch(approproduitActions.editApproproduits(approproduit))},
        detailApproproduit: (productId) => {dispatch(approproduitActions.detailApproproduit(productId))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tabset_product))
