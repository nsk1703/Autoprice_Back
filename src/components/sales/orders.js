import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/orders';
import Datatable from '../common/datatable'
import Image from '../../components/common/image';
import Data_orders from '../common/dataTables/data_orders';
import * as orderActions  from "../../redux/actions/orderActions";
import { connect } from 'react-redux';  
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
           orders: [],
           roles: null,
           loading: false
        };

    }

    componentDidMount = () =>{
        let listOrders = []
        let rol = null;

        this.setState({
            loading: true
        })
        this.props.orders()

        setTimeout(() => {
            // console.log(this.props.order.orders)

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
                    methode_paiement: (order.paiement_id)? <span className="badge badge-success">{order.paiement_id.methode} - {order.paiement_id.telephone}</span>:'',
                    methode_remboursement: (order.remboursement_id)? <span className="badge badge-success">{order.remboursement_id.methode} - {order.remboursement_id.telephone}</span>:'',
                    date: Date(order.created_on)
                }
                listOrders.push(item);
            })

            this.setState({
                    orders: listOrders
                })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.commandes;
            })
            this.setState({
                roles: rol,
                loading: false
            })
        }, 1000)

    }

    render() {
        const {orders, roles, loading} = this.state
        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles == '1'){
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
                                        <ToastContainer />
                                        <div className="card-body order-datatable">
                                        <Data_orders
                                            multiSelectOption={false}
                                            myData={orders}
                                            check={false}
                                            pageSize={10}
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
            }else{
           return(
               <Fragment>

               </Fragment>
           )
            }
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        order: state.order,
        roledetails: state.roledetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        orders: () => {dispatch(orderActions.orders())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders)
