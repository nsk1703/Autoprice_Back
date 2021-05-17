import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_product from './tabset-product';
import { Link } from 'react-router-dom'


export class Create_currency extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Approvisionnement de Produit" parent="Approvisionnement / Produits" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/supply/products/list-product" className="btn btn-primary">Retour</Link>
                                </div>
                                <div className="card-body">
                                    <Tabset_product />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Create_currency
