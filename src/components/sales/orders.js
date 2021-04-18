import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/orders';
import Image from '../../components/common/image';
import Datatable from '../common/datatable'
import Data_orders from '../common/dataTables/data_orders';
import * as orderActions from "../../redux/actions/orderActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

export class Orders extends Component {

    constructor(props) {
        super(props);
        let listOrders = [];

        this.state = {
            open: false,
            data: []
        };

        this.props.listOrders();


        setTimeout(() => {
            console.log(this.props.order.orders)

            this.props.order.orders.map(order => {
                let image = [];

                order.order_details.order_details.map(order_detail => {
                    image.push(order_detail.product_id.images[0].filePath)
                })
                let item = {
                    ID: "#"+order.order_id,
                    image: <Image id="image1" data={image} />,
                    tracking_number: order.tracking_number,
                    total: <span className="badge badge-info">{order.total_amount} FCFA</span>,
                    Délivré: (order.is_delivried != 0)? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Payé: (order.paiement_id)? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Remboursement: (order.remboursement_id)? <span className="badge badge-success">OUI</span>:<span className="badge badge-warning">NON</span>,
                    Machine: order.machine_id.nom,
                    payment_method: (order.paiement_id)? <span className="badge badge-success">{order.paiement_id.methode} - {order.paiement_id.telephone}</span>:'',
                    repayment_method: (order.remboursement_id)? <span className="badge badge-success">{order.remboursement_id.methode} - {order.remboursement_id.telephone}</span>:'',
                    date: Date(order.created_on)
                }
                listOrders.push(item);
            })


            this.setState({
                    data: listOrders
                })
        }, 2000)


        this.state = {
            open: false,
            data: listOrders
        };
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Commandes" parent="Ventes" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Gestionnaire de Commandes</h5>
                                </div>
                                <div className="card-body order-datatable">
                                <Data_orders
                                    multiSelectOption={false}
                                    myData={this.state.data}
                                    check={false}
                                    pageSize={20}
                                    pagination={true}
                                    class="-striped -highlight"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        listOrders: () => {dispatch( orderActions.listOrders())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders))
