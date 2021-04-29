import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_products from '../../common/dataTables/data_products';
import * as approproduitActions  from "../../../redux/actions/approproduitActions";
import { connect } from 'react-redux'; 

export class List_product extends Component {
    constructor(props) {
        super(props);
        let listProducts = []

        this.state = {
           products: []
        };

        this.props.approproduits()

        setTimeout(() => {
            console.log(this.props.approproduit.approproduits)

            this.props.approproduit.approproduits.map(approproduit => {
               
                let item = {
                    ID: "#"+approproduit.id,
                    etat: approproduit.etat,
                    quantite: <span className="badge badge-info">{approproduit.quantite} FCFA</span>,
                    produit: approproduit.productId,
                    Description: approproduit.description,
                    // utilisateur: approproduit.utilisateurid.username
                   
                }
                listProducts.push(item);
            })


            this.setState({
                products: listProducts
            })
        }, 2000)
        this.state ={
            products: listProducts
        }

    }
    render() {
        const {products} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des produits" parent="Produits" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/supply/products/create-product" className="btn btn-primary">Ajout Produit</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Data_products
                                    multiSelectOption={true}
                                    myData={products}
                                    pageSize={10}
                                    pagination={true}
                                    class="-striped -highlight"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        approproduit: state.approproduit
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        approproduits: () => {dispatch(approproduitActions.approproduits())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List_product)
