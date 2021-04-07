import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_currency from './tabset-currency';

export class Create_currency extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Approvisionnement de Monnaie" parent="Monnaie" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Approvisionnement de Monnaie</h5>
                                </div>
                                <div className="card-body">
                                    <Tabset_currency />
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
