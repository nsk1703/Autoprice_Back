import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_currency from './tabset-currency';
import { Link } from "react-router-dom";

export class Create_currency extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Approvisionnement de Monnaie" parent="Approvisionnement / Monnaie" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <Link type="button" to="/supply/currency/list-currency" 
                                    className="btn btn-primary">Retour</Link>
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
