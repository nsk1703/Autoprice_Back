import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import axios from "axios";
import { Edit, Trash2 } from 'react-feather'
import { Link, withRouter } from 'react-router-dom';
import * as productActions from "../../../redux/actions/productActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class Product_list extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            products: [],
            visible: false,
            roles: null,
            deletable: false,
            updatable: false,
            loading: false
        };

        this.handleDeleteProduct = this.handleDeleteProduct.bind(this)

    }

    handleDeleteProduct = (productid) => {
        
        // console.log(productid)
        this.props.deleteProduct(productid);

        // setTimeout(() => {
            // axios.get('/products')
            //     .then((response) => {
            //         const { products } = response.data
            //         console.log(products)
            //         this.setState({
            //             products: products
            //         })
            //     })
        // },1000)
    }

    componentDidMount = () =>{
        let listProducts = [];
        let rol = null;

        this.setState({
            loading: true
        })
        this.props.products();

        setTimeout(() => {
            // console.log(this.props.product.products)

            this.props.product.products.map(product => {
                let item = {
                    product_id: product.product_id,
                    image: product.image_urls[0],
                    Nom: product.name,
                    Prix: product.price+" FCFA",
                    machine:product.machineId,
                    unit:product.unit,
                    reference:product.reference,
                    description:product.description,
                    quantite:product.quantite,
                    etat:product.etat,
                    categories :product.categories[0]
                }
                listProducts.push(item);
            })
            this.setState({
                products: listProducts
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.listeProduit;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterProduit== '1'){
                this.setState({
                    visible: true
                })
            }
            if(this.props.roledetails.role[0].modifierProduit == '1'){
                this.setState({
                   updatable: true
                })
            }
            if(this.props.roledetails.role[0].supprimerProduit == '1'){
                this.setState({
                    deletable: true
                })
            }
            this.setState({
                loading: false
            })
        }, 1000)

    }

    render() {
        const { loading, currencies, roles, visible, deletable, updatable } = this.state

        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles == '1') {
                return (
                    <Fragment>
                        <Breadcrumb title="Liste des Produits" parent="Produits" />
                        <div className="container-fluid">
                            <div className="card">
                                {visible == true ?
                                    (
                                        <div className="card-header">
                                            <Link type="button" to="/products/physical/add-product" className="btn btn-primary">Ajouter un Produit</Link>
                                        </div>
                                    ):
                                    null
                                }
                            </div>
                            <div className="row products-admin ratio_asos">
                            <ToastContainer />
                                {
                                    
                                    this.state.products.map((myData, i) => {
                                        return (
                                            <div className="col-xl-3 col-sm-6" key={i}>
                                                <div className="card">
                                                    <div className="products-admin">
                                                        <div className="card-body product-box">
                                                            <div className="img-wrapper">
                                                                <div className="lable-block">
                                                                    {(myData.quantite)?((myData.quantite< 4)?<span className="lable31">{myData.quantite}</span>:<span className="lable3">{myData.quantite}</span>) : <span className="lable32">{myData.quantite}</span>}
                                                                    {(myData.discount === 'on sale' )?<span className="lable4">{myData.discount}</span> : '' }
                                                                </div>
                                                                <div className="front">
                                                                    <a className="bg-size"><img className="img-fluid blur-up bg-img lazyloaded" src={myData.image} /></a>
                                                                    <div className="product-hover">
                                                                        {deletable == true && updatable == true ?
                                                                        (
                                                                            <ul>
                                                                                <li>
                                                                                    <Link className="btn" type="button" 
                                                                                        to={`/products/physical/edit-products/${myData.product_id}`}>
                                                                                        <Edit className="editBtn" />
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <button className="btn" 
                                                                                        type="button"
                                                                                        onClick={(e) =>{
                                                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                                                this.handleDeleteProduct(myData.product_id)
                                                                                                setTimeout(() => {
                                                                                                    window.location.reload()
                                                                                                },1000)
                                                                                        }}
                                                                                        ><Trash2 className="deleteBtn" />
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        ) : deletable == false && updatable == true ?
                                                                        (
                                                                            <ul>
                                                                                <li>
                                                                                    <Link className="btn" type="button" 
                                                                                        to={`/products/physical/edit-products/${myData.product_id}`}>
                                                                                        <Edit className="editBtn" />
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        ): deletable == true && updatable == false ?
                                                                        (
                                                                            <ul>
                                                                                <li>
                                                                                    <button className="btn" 
                                                                                        type="button"
                                                                                        onClick={(e) =>{
                                                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                                                this.handleDeleteProduct(myData.product_id)
                                                                                                setTimeout(() => {
                                                                                                    window.location.reload()
                                                                                                },1000)
                                                                                        }}
                                                                                        ><Trash2 className="deleteBtn" />
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        ):
                                                                        null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-detail">
                                                                <a> <h6 >{myData.Nom}</h6></a>
                                                                <h4 >{myData.Prix} </h4>
                                                                <ul>
                                                                    <li>{myData.unit} </li><br/>
                                                                    <li>{myData.description}</li><br/>
                                                                    <li>{myData.machine.nom}</li><br/>
                                                                    <li>Ref: {myData.reference}</li>
                                                                </ul>
                                                                {/* <div className="rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                </div>
                                                                <a> <h6 >{myData.title}</h6></a>
                                                                <h4 >{myData.price} <del >{myData.discount_price}</del></h4>
                                                                <ul className="color-variant">
                                                                    <li className="bg-light0"></li>
                                                                    <li className="bg-light1"></li>
                                                                    <li className="bg-light2"></li>
                                                                </ul> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </Fragment>
                )
            }else{
                return (
                    <Fragment>

                    </Fragment>
                )
            }
        }
    }   
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        productaction: state.productaction,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        products: () => {dispatch( productActions.products())},
        deleteProduct: (productID) => {dispatch(productActions.deleteProduct(productID))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product_list))
