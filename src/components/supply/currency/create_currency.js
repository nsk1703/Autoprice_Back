import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_currency from './tabset-currency';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import * as roleActions  from "../../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class Create_currency extends Component {
    constructor(props){
        super(props)

        this.state = {
            visible: false,
            roles: null,
            loading: false,
            ajouter: null,
            lister: null
        }

    }

    componentDidMount = () => {
        let ajout = null;
        let liste = null;

        this.setState({
            loading: true
        })

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                console.log('rl',rl)
                ajout = rl.ajouterApproMonnaie
                liste = rl.listeApproMonnaie
            })
            this.setState({
                ajouter: ajout,
                lister: liste
            })
            console.log('rls', this.state.roles)
            if(this.state.lister == '1'){
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
        const {ajouter, loading, roles, visible} = this.state

        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(ajouter == '1'){
                return (
                    <Fragment>
                        <Breadcrumb title="Approvisionnement de Monnaie" parent="Approvisionnement / Monnaie" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                    {visible == true ?
                                        (
                                            <div className="card-header">
                                                <Link type="button" to="/supply/currency/list-currency" 
                                                className="btn btn-primary">Retour</Link>
                                            </div>
                                        ):
                                        null
                                    }
                                        <div className="card-body">
                                            <Tabset_currency />
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

export default connect(mapStateToProps, mapDispatchToProps)(Create_currency)
