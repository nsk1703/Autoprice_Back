import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/listUser';
import Datatable from '../../common/datatable'
import Data_currencies from '../../common/dataTables/data_currencies';
import * as appromonnaieActions  from "../../../redux/actions/appromonnaieActions";
import { connect } from 'react-redux';  
import { ToastContainer, toast } from 'react-toastify';

export class List_currency extends Component {
    constructor(props) {
        super(props)
        let listCurrencies = []

        this.state = {
            currencies: []
        };

        this.props.appromonnaies();

        setTimeout(() => {
            // console.log(this.props.appromonnaie.appromonnaies)

            this.props.appromonnaie.appromonnaies.map(appromonnaie => {
               
                let item = {
                    ID: appromonnaie.id,
                    etat: appromonnaie.etat,
                    quantite: <span className="badge badge-info">{appromonnaie.quantite} FCFA</span>,
                    Machine: appromonnaie.machine_id.nom,
                    Description: appromonnaie.description,
                   
                }
                listCurrencies.push(item);
            })


            this.setState({
                currencies: listCurrencies
            })
        }, 2000)
        this.state ={
            currencies: listCurrencies
        }
 
    }
    render() {
        const { currencies } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des monnaies" parent="Monnaies" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <Link to="/supply/currency/create-currency" className="btn btn-primary">Ajout de Monnaie</Link>
                        </div>
                        <div className="card-body">
                            <ToastContainer />
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list appromonnaie-table coupon-list-delete">
                                <Data_currencies
                                    multiSelectOption={true}
                                    myData={currencies}
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
        appromonnaie: state.appromonnaie
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        appromonnaies: () => {dispatch(appromonnaieActions.appromonnaies())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List_currency)
