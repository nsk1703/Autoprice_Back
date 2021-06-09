import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_product from './tabset-product';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import * as roleActions  from "../../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class Create_product extends Component {
    constructor(props){
        super(props)

        this.state = {
            visible: false,
            roles: null,
            loading: false,
        }
    }

    componentDidMount = () => {
        let rol = null
        this.setState({
            loading: true
        })
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterApproProduit;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeApproProduit == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {
        const {loading, roles, visible} = this.state
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
                        <Breadcrumb title="Approvisionnement de Produit" parent="Approvisionnement / Produits" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link to="/supply/products/list-product" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <Tabset_product />
                                        </div>
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
}

const mapStateToProps = (state) => {
    return {
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_product)
