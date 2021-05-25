import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_products from '../../common/dataTables/data_products';
import * as approproduitActions  from "../../../redux/actions/approproduitActions";
import { connect } from 'react-redux'; 
import * as roleActions  from "../../../redux/actions/roleActions";

export class List_product extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
           products: [],
           roles: null,
           visible: false
        };
    }

    componentDidMount = () => {
        let listProducts = [];
        let rol = null;

        this.props.approproduits()

        setTimeout(() => {
            this.props.approproduit.approproduits.map(approproduit => {
                let item = {
                    ID: approproduit.id,
                    etat: approproduit.etat,
                    quantite: <span className="badge badge-info">{approproduit.quantite} FCFA</span>,
                    produit: approproduit.productId.name,
                    Description: approproduit.description,
                    // utilisateur: approproduit.utilisateurid.username
                   
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
                rol = rl.listeApproProduit;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterApproProduit == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)

    }

    render() {
        const {products, roles, visible} = this.state
        if(roles == 1) {
            return (
                <Fragment>
                    <Breadcrumb title="Liste des produits" parent="Approvisionnement / Produits" />
                    <div className="container-fluid">
                        <div className="card">
                            {visible == true ?
                                (
                                    <div className="card-header">
                                        <Link to="/supply/products/create-product" className="btn btn-primary">Ajout de Produit</Link>
                                    </div>
                                ):
                                null
                            }
                            <div className="card-body">
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
        }else{
            return (
                <Fragment>

                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        approproduit: state.approproduit,
        roledetails: state.roledetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        approproduits: () => {dispatch(approproduitActions.approproduits())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List_product)
