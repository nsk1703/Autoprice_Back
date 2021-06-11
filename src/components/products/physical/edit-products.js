import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { Link } from "react-router-dom";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../../assets/images/pro3/1.jpg'
import user from '../../../assets/images/user.png';
import * as machineActions from "../../../redux/actions/machineActions";
import * as categoryActions from "../../../redux/actions/categoryActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as productActions from '../../../redux/actions/productActions';
import Select from 'react-select';
import { withRouter, Redirect, Router } from 'react-router-dom';
import * as roleActions from "../../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

// const dummyimgs= [
//     { img: user }
// ]

export class Edit_product extends Component {
    constructor(props) {
        super(props)
         
        this.state = {
            id: '',
            nom: '',
            unite: '', 
            quantite: 1,
            reference: '',
            price: '',
            machine_id:'',
            category: '',
            description: '',
            CatOptions: [],
            MacOptions: [],
            images: null,
            isLoading: false,
            visible: false,
            roles: null,
            loading: false,
            actualFile: null,
            dummyimgs: [
                { img: user }
            ]
            
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.machineHandleChange = this.machineHandleChange.bind(this)
        this.categoryHandleChange = this.categoryHandleChange.bind(this)
        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    IncrementItem = () => {
        this.setState(prevState => {
            if (prevState.quantite < 9) {
                return {
                    quantite: prevState.quantite + 1
                }
            } else {
                return null;
            }
        });
    }
    
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantite > 0) {
                return {
                    quantite: prevState.quantite - 1
                }
            } else {
                return null;
            }
        });
    }

    machineHandleChange = (machine_id) => {
        this.setState({ machine_id });
    }

    categoryHandleChange = (category_id) => {
        this.setState({ category_id });
    }

    //image upload
    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImgChange(e, i) {
        e.preventDefault();

        // let reader = new FileReader();
        // let file = e.target.files[0];
        // const { dummyimgs } = this.state;
        // console.log('state', dummyimgs)
        // reader.onloadend = () => {
            // dummyimgs[i].img = reader.result;
            // this.setState({
            //     images: file,
            //     dummyimgs,
            // });
            if(!this.state.images){
                this.setState({
                    images: e.target.files[0]
                });
            }
        // }
        // reader.readAsDataURL(file)
    }

    componentDidMount = (e) => {

        let catoptions = []
        let listCategories= []
        let macoptions = []
        let listMachines = []
        let rol = null;

        this.setState({
            loading: true
        })

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierProduit;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeProduit == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)

        this.props.detailProduct(this.props.match.params.id)

        setTimeout(() => {
            console.log(this.props.prodetails)

            let category = {value: this.props.prodetails.product.categories[0].category_id, 
                            label: this.props.prodetails.product.categories[0].name}

            let machine =  {value: this.props.prodetails.product.machineId.id, 
                            label: this.props.prodetails.product.machineId.nom}
            // console.log(category)
            this.setState({
                id: this.props.prodetails.product.product_id,
                nom: this.props.prodetails.product.name,
                unite: this.props.prodetails.product.unit, 
                quantite: this.props.prodetails.product.quantite,
                reference: this.props.prodetails.product.reference,
                price: this.props.prodetails.product.price,
                machine_id: machine,
                category: category,
                description: this.props.prodetails.product.description,
                actualFile: this.props.prodetails.product.image_urls[0],
                // images: this.props.prodetails.product.image_urls[0]
            })

        }, 1000)

        this.props.categories();

        setTimeout(() => {
            console.log(this.props.category.categories)

            this.props.category.categories.map(category => {
                let item = {
                    id: category.category_id,
                    Nom: category.name
                }
                listCategories.push(item);
            })
            
            console.log('maaa',listCategories)
            listCategories.map(listCategorie => {
                let option = 
                    {value:listCategorie.id, label: listCategorie.Nom }
                
                catoptions.push(option)
            })
            // console.log('ooooo', catoptions)

            this.setState({
                CatOptions: catoptions
            })
        }, 1000)

        this.props.machines();

        setTimeout(() => {
            // console.log(this.props.machine.machines)

            this.props.machine.machines.map(machine => {
                let item = {
                    id: machine.id,
                    Nom: machine.nom
                }
                listMachines.push(item);
            })
            
            // console.log('maaa',listMachines)
            listMachines.map(listMachine => {
                let option = 
                    {value:listMachine.id, label: listMachine.Nom }
                
                macoptions.push(option)
            })
            // console.log('aaaa', macoptions)
            this.setState({
                MacOptions: macoptions,
                loading: false
            })
        }, 1000)
        
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        // // console.log(this.state.AllOptions)
        this.props.editProduct(this.state);
       
        setTimeout(()=> {
            console.log(this.props.editproduct)
            if(this.props.editproduct.isUpdated === true){
                this.props.history.push('/products/physical/product-list');
            }else{
                this.props.history.push('/products/physical/edit-product/'+this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
       
    }

    render() {
        const {actualFile, loading, roles, visible, isLoading, CatOptions, images, MacOptions, nom , price, quantite, unite, reference, description, machine_id, category} = this.state
        // console.log('dum', dummyimgs)
        const customStyles = {
            input: (provided, state) => ({
                ...provided,
                margin: '0px',
                width: '715px'
            }),
        }
        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles == '1'){
                return (
                    <Fragment>
                        <Breadcrumb title="Modifier un produit" parent="Produits / Liste des Produits" />
        
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/products/physical/product-list" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <div className="row product-adding">
                                                <div className="col-xl-5">
                                                    <div className="add-product">
                                                        <div className="row">
                                                            <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                                <img src={actualFile} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-7">
                                                    <AvForm className="needs-validation add-product-form" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                        <div className="form form-label-center">
                                                            <div className="form-group row">
                                                                <label htmlFor="message-text" className="col-xl-3 col-md-4">Image du Produit :</label>
                                                                <input className="form-control col-xl-8 col-md-7"
                                                                    type="file" 
                                                                    onChange={(e) => this._handleImgChange(e)} 
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3 row">
                                                                <label className="col-xl-3 col-sm-4 mb-0">Nom du Produit :</label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <AvField className="form-control" 
                                                                    name="nom"
                                                                    id="validationCustom01" type="text" 
                                                                    value={nom}
                                                                    onChange={this.handleInputChange}
                                                                    required />
                                                                </div>
                                                                <div className="valid-feedback">Acceptable!</div>
                                                            </div>
                                                            <div className="form-group mb-3 row">
                                                                <label className="col-xl-3 col-sm-4 mb-0">Prix :</label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <AvField className="form-control mb-0" 
                                                                    name="price" id="validationCustom02"
                                                                    value={price}
                                                                    onChange={this.handleInputChange} 
                                                                    type="number" 
                                                                    required />
                                                                </div>
                                                                <div className="valid-feedback">Acceptable!</div>
                                                            </div>
                                                            <div className="form-group mb-3 row">
                                                                <label className="col-xl-3 col-sm-4 mb-0">Unité :</label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <AvField className="form-control " 
                                                                    name="unite"
                                                                    value={unite} 
                                                                    id="validationCustom03"
                                                                    onChange={this.handleInputChange}
                                                                    type="text" required />
                                                                </div>
                                                                <div className="invalid-feedback offset-sm-4 offset-xl-3">Veuillez choisir un code valide.</div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-xl-3 col-sm-4 mb-0">Quantité d'articles :</label>
                                                                <fieldset className="qty-box ml-0">
                                                                    <div className="input-group bootstrap-touchspin">
                                                                        <div className="input-group-prepend">
                                                                            <button className="btn btn-primary btn-square bootstrap-touchspin-down" type="button" onClick={this.DecreaseItem} >
                                                                                <i className="fa fa-minus"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text bootstrap-touchspin-prefix" ></span>
                                                                        </div>
                                                                        <input className="touchspin form-control" 
                                                                            type="number"
                                                                            name='quantite'
                                                                            value={quantite} 
                                                                            onChange={this.handleInputChange} 
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                                                        </div>
                                                                        <div className="input-group-append ml-0">
                                                                            <button className="btn btn-primary btn-square bootstrap-touchspin-up" type="button" onClick={this.IncrementItem}>
                                                                                <i className="fa fa-plus"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                            <div className="form-group mb-3 row">
                                                                <label className="col-xl-3 col-sm-4 mb-0">Reférence du Produit :</label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <AvField className="form-control " 
                                                                    name="reference" 
                                                                    value={reference} 
                                                                    onChange={this.handleInputChange} 
                                                                    id="validationCustomUsername" 
                                                                    type="text" required />
                                                                </div>
                                                                <div className="invalid-feedback offset-sm-4 offset-xl-3">Veuillez choisir un code valide.</div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4 mb-0" >Nom de machine :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <Select
                                                                    styles={customStyles}
                                                                    name="machine_id"
                                                                    value={machine_id}
                                                                    options={MacOptions}
                                                                    onChange={this.machineHandleChange}
                                                                    required="" 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4 mb-0" >Categorie du Produit :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <Select
                                                                    styles={customStyles}
                                                                    name="category_id"
                                                                    value={category}
                                                                    options={CatOptions}
                                                                    onChange={this.categoryHandleChange}
                                                                    required="" 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form">
                                                            <div className="form-group row">
                                                                <label className="col-xl-3 col-sm-4">Description du produit :</label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <textarea name="description" 
                                                                        value={description} 
                                                                        onChange={this.handleInputChange}
                                                                        rows="8" cols="107"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ToastContainer />
                                                        <div className="offset-xl-3 offset-sm-4">
                                                            <button type="submit" className="btn btn-primary mr-2"
                                                            disabled={isLoading}
                                                            onClick={this.handleSubmitChange}
                                                            >Ajouter</button>
                                                            <Link to="/products/physical/product-list" type="button" className="btn btn-secondary">Annuler</Link>
                                                        </div>
                                                    </AvForm>
                                                </div>
                                            </div>
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
    
}

const mapStateToProps = (state, props) => {
    return {
        machine: state.machine,
        category: state.category,
        editproduct: state.editproduct,
        prodetails: state.prodetails,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())},
        categories: () => {dispatch(categoryActions.categories())},
        editProduct: (product) => {dispatch(productActions.editProduct(product))},
        detailProduct: (productid) => {dispatch(productActions.detailProduct(productid))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit_product))
