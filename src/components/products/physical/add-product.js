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
import * as roleActions  from "../../../redux/actions/roleActions";

const dummyimgs= [
    { img: user }
]

export class Add_product extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
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
            roles: null
            
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

    _handleImgChange(e) {
        e.preventDefault();

        // let reader = new FileReader();
        let file = e.target.files[0];
        // const { dummyimgs } = this.state;

        // reader.onloadend = () => {
            // dummyimgs[i].img = reader.result;
            this.setState({
                images: file,
                // dummyimgs,
            });
        // }
        // reader.readAsDataURL(file)
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        // // console.log(this.state.AllOptions)
        this.props.newProduct(this.state);
       
        setTimeout(()=> {
            console.log(this.props.addproduct.success)
            if(this.props.addproduct.success === true){
                this.props.history.push('/products/physical/product-list');
            }else{
                this.props.history.push('/products/physical/add-product');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
       

    }

    componentDidMount = () => {
        let catoptions = [];
        let listCategories= [];
        let macoptions = [];
        let listMachines = [];
        let rol = null;

        this.props.categories();

        setTimeout(() => {
            // console.log(this.props.category.categories)

            this.props.category.categories.map(category => {
                let item = {
                    id: category.category_id,
                    Nom: category.name
                }
                listCategories.push(item);
            })
            
            // console.log('maaa',listCategories)
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

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterProduit;
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
                MacOptions: macoptions
            })
        }, 1000)
    }

    render() {
        const {visible, roles, isLoading, CatOptions, images, MacOptions, nom , price, quantite, unite, reference, description, machine_id, category_id} = this.state
        // console.log(dummyimgs)
       if(roles == '1'){
            return (
                <Fragment>
                    <Breadcrumb title="Ajout d'un produit" parent="Produits" />

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
                                                            <img src={ images ? images : one } alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                        </div>
                                                        <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                            <ul className="file-upload-product">
                                                                {
                                                                    // dummyimgs.map((res, i) => {
                                                                    //     return (
                                                                    //         <li key={i}>
                                                                                <div className="box-input-file">
                                                                                    <input className="upload" type="file" 
                                                                                    onChange={(e) => this._handleImgChange(e)} 
                                                                                    required
                                                                                    />
                                                                                    <img src={images ? images : user } style={{ width: 50, height: 50 }} />
                                                                                    <a id="result1" onClick={(e) => this._handleSubmit(e.target.id)}></a>
                                                                                </div>
                                                                    //         </li>
                                                                    //     )
                                                                    // })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7">
                                            <ToastContainer />
                                                <AvForm className="needs-validation add-product-form" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                    <div className="form form-label-center">
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
                                                            <Select className="col-xl-8 col-md-7"
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
                                                            <Select className="col-xl-8 col-md-7"
                                                                name="category_id"
                                                                value={category_id}
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
                                                                    rows="5" cols="88"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="offset-xl-3 offset-sm-4">
                                                        <button type="submit" className="btn btn-primary mr-2"
                                                        disabled={isLoading}
                                                        onClick={this.handleSubmitChange}
                                                        >Ajouter</button>
                                                        {visible == true ?
                                                            (
                                                                <Link to="/products/physical/product-list" 
                                                                    type="button" className="btn btn-secondary"
                                                                >Annuler</Link>
                                                            ):
                                                            null
                                                        }
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

const mapStateToProps = (state) => {
    return {
        machine: state.machine,
        category: state.category,
        addproduct: state.addproduct,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        machines: () => {dispatch( machineActions.machines())},
        categories: () => {dispatch( categoryActions.categories())},
        newProduct: (product) => {dispatch(productActions.newProduct(product))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add_product))
