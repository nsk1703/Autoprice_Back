import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import { Edit, Trash2 } from 'react-feather'
import {Link, withRouter} from 'react-router-dom';
import * as productActions from "../../../redux/actions/productActions";
import {connect} from "react-redux";
import {Category} from "./category";


export class Product_list extends Component {
    constructor(props) {
        super(props);
        let listProducts = [];

        this.state = {
            open: false,
            data: []
        };

        this.props.listProducts();


        setTimeout(() => {
            console.log(this.props.product.products)

            this.props.product.products.map(product => {
                let item = {
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
                    data: listProducts
                })
        }, 1000)


        this.state = {
            open: false,
            data: listProducts
        };
    }
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Produits" parent="" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                        <Link type="button" to="/products/physical/add-product" className="btn btn-primary">Ajouter un Produit</Link>
                        </div>
                    </div>
                    <div className="row products-admin ratio_asos">
                        {
                            this.state.data.map((myData, i) => {
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
                                                                <ul>
                                                                    <li>
                                                                        <button className="btn" type="button">
                                                                            <Edit className="editBtn" />
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button">
                                                                            <Trash2 className="deleteBtn" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
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
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        listProducts: () => {dispatch( productActions.listProducts())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product_list))
