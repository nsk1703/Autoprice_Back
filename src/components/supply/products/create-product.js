import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_product from './tabset-product';

export class Create_currency extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Approvisionnement de Produit" parent="Approvisionnement" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Approvisionnement de Produit</h5>
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
