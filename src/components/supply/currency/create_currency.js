import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Tabset_currency from './tabset-currency';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import * as roleActions  from "../../../redux/actions/roleActions";

export class Create_currency extends Component {
    constructor(props){
        super(props)

        this.state = {
            visible: false,
            roles: null
        }

    }

    componentDidMount = () => {
        let rol = null
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterApproMonnaie;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeApproMonnaie == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)
    }
    
    render() {
        const {roles, visible} = this.state

        if(roles == '1'){
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
