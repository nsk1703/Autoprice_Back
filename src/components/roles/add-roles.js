import React, { Component,Fragment } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Breadcrumb from '../common/breadcrumb';
import CKEditors from 'react-ckeditor-component';
import { Link } from "react-router-dom";
import * as roleActions from "../../redux/actions/roleActions";
import {connect} from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

export class Add_roles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isLoading: false,
            visible: false,
            roles: null,
            loading: false,

            active: "1",
            desactive: "0",

            name: '',
            description: '',           
            
            dashboard: '0',
            log: '0',
            statistique: '0',
            commandes: '0',
            paiements: '0',
            remboursements: '0',

            listeProduit: '0',
            ajouterProduit: '0',
            modifierProduit: '0',
            supprimerProduit: '0',

            listeCategorie: '0',
            ajouterCategorie: '0',
            modifierCategorie: '0',
            supprimerCategorie: '0',

            listeApproMonnaie: '0',
            ajouterApproMonnaie: '0',
            modifierApproMonnaie: '0',
            supprimerApproMonnaie: '0',

            listeApproProduit: '0',
            ajouterApproProduit: '0',
            modifierApproProduit: '0',
            supprimerApproProduit: '0',

            listeMachine: '0',
            ajouterMachine: '0',
            modifierMachine: '0',
            supprimerMachine: '0',

            listeMaintenance: '0',
            ajouterMaintenance: '0',
            modifierMaintenance: '0',
            supprimerMaintenance: '0',

            listeSlide:'0',
            ajouterSlide:'0',
            modifierSlide:'0',
            supprimerSlide:'0',

            listeRole: '0',
            ajouterRole: '0',
            modifierRole: '0',
            supprimerRole: '0',

            listeUtilisateur: '0',
            ajouterUtilisateur: '0',
            modifierUtilisateur: '0',
            supprimerUtilisateur: '0',
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    handleInputChange = (e) => {
        this.setState({
                [e.target.name]: e.target.value,
        })
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        // console.log(this.state.AllOptions)
        this.setState({
            isLoading: true
        })
        this.props.newRole(this.state)

        setTimeout(()=> {
            console.log(this.props.addrole.success)
            if(this.props.addrole.success === true){
                this.props.history.push('/roles/roles-list');
            }else{
                this.props.history.push('/roles/add-roles');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }

    componentDidMount = () => {
        this.props.actionsdetailRole(localStorage.getItem('roles'))
        let rol = null

        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterRole;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].listeRole == '1'){
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
        
        if(this.state.loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={this.state.loading} size={50} />
                </div>
            )
        }else{
            if(this.state.roles == '1'){
                return (
                    <Fragment>    
                        <Breadcrumb title="Ajouter un rôle " parent="Rôles" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {this.state.visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/roles/roles-list" 
                                                    className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation user-add" noValidate="">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Name :</label>
                                                    <input className="form-control col-xl-8 col-md-7" id="validationCustom0" 
                                                        type="text" required="" 
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleInputChange}
                                                        />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4">Description :</label>
                                                    <textarea className=" form-control col-xl-8 col-md-7" 
                                                        name="description" 
                                                        value={this.state.description} 
                                                        onChange={this.handleInputChange}
                                                        rows="10" cols="92"
                                                    />
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Produits</h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani1" 
                                                                        type="radio" name="listeProduit"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeProduit === this.state.active} 
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani2" 
                                                                    type="radio" name="listeProduit" 
                                                                    value={this.state.desactive}
                                                                    onChange={this.handleInputChange}
                                                                    checked={this.state.listeProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani3" 
                                                                        type="radio" name="ajouterProduit"
                                                                        value={this.state.active}  
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani4" 
                                                                        type="radio" name="ajouterProduit"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani5" 
                                                                        type="radio" name="modifierProduit"
                                                                        value={this.state.active}  
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani6" 
                                                                        type="radio" name="modifierProduit"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label >Suppression de produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani7" 
                                                                        type="radio" name="supprimerProduit"
                                                                        value={this.state.active}  
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani8" 
                                                                        type="radio" name="supprimerProduit"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Catégories</h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste de Catégories</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani9" 
                                                                        type="radio" name="listeCategorie"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeCategorie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani10" 
                                                                        type="radio" name="listeCategorie"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeCategorie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout de Catégories</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani11" 
                                                                        type="radio" name="ajouterCategorie"
                                                                        value={this.state.active}  
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterCategorie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani12" 
                                                                        type="radio" name="ajouterCategorie"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterCategorie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification de Catégories</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani13" 
                                                                        type="radio" name="modifierCategorie"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierCategorie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani14" 
                                                                        type="radio" name="modifierCategorie"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierCategorie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label >Suppression de Catégories</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani15" 
                                                                        type="radio" name="supprimerCategorie"
                                                                        value={this.state.active}  
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerCategorie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block">
                                                                    <input className="radio_animated" id="edo-ani16" 
                                                                        type="radio" name="supprimerCategorie"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.supprimerCategorie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Appro... de Monnaies </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Appro... de Monnaies</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani17" 
                                                                        type="radio" name="listeApproMonnaie"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeApproMonnaie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani18" 
                                                                        type="radio" name="listeApproMonnaie"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeApproMonnaie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'un Appro... de Monnaies</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani19" 
                                                                        type="radio" name="ajouterApproMonnaie"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterApproMonnaie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani20" 
                                                                        type="radio" name="ajouterApproMonnaie" 
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterApproMonnaie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification Appro... de Monnaies</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani21" 
                                                                    type="radio" name="modifierApproMonnaie"
                                                                    value={this.state.active} 
                                                                    onChange={this.handleInputChange}
                                                                    checked={this.state.modifierApproMonnaie === this.state.active}
                                                                />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani22" 
                                                                        type="radio" name="modifierApproMonnaie"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierApproMonnaie === this.state.desactive}
                                                                    />
                                                                Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression des Appro... de Monnaies</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani23" 
                                                                        type="radio" name="supprimerApproMonnaie"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerApproMonnaie === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani24" 
                                                                        type="radio" name="supprimerApproMonnaie"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerApproMonnaie === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Appro... de Produits </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Appro... de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani25" 
                                                                        type="radio" name="listeApproProduit"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeApproProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani26" 
                                                                        type="radio" name="listeApproProduit"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeApproProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'un Appro... de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani27" 
                                                                        type="radio" name="ajouterApproProduit"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.ajouterApproProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani28" 
                                                                        type="radio" name="ajouterApproProduit"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.ajouterApproProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification Appro... de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani29" 
                                                                        type="radio" name="modifierApproProduit"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierApproProduit === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani30" 
                                                                        type="radio" name="modifierApproProduit"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierApproProduit === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de Appro... de Produits</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani31" 
                                                                    type="radio" name="supprimerApproProduit"
                                                                    value={this.state.active} 
                                                                    onChange={this.handleInputChange}
                                                                    checked={this.state.supprimerApproProduit === this.state.active}
                                                                />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani32" 
                                                                    type="radio" name="supprimerApproProduit"
                                                                    value={this.state.desactive}
                                                                    onChange={this.handleInputChange}
                                                                    checked={this.state.supprimerApproProduit === this.state.desactive}
                                                                />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Machines </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Machines</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani33" 
                                                                        type="radio" name="listeMachine"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeMachine === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani34" 
                                                                        type="radio" name="listeMachine"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeMachine === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'un Machines</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani35" 
                                                                        type="radio" name="ajouterMachine"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterMachine === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani36" 
                                                                        type="radio" name="ajouterMachine"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.ajouterMachine === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification Machines</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani37" 
                                                                        type="radio" name="modifierMachine"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierMachine === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani38" 
                                                                        type="radio" name="modifierMachine"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierMachine === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de Machines</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani19" 
                                                                        type="radio" name="supprimerMachine"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerMachine === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani40" 
                                                                        type="radio" name="supprimerMachine" 
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerMachine === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Maintenances </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Maintenances</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani33" 
                                                                        type="radio" name="listeMaintenance"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeMaintenance === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani34" 
                                                                        type="radio" name="listeMaintenance"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeMaintenance === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'une Maintenance</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani35" 
                                                                        type="radio" name="ajouterMaintenance"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterMaintenance === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani36" 
                                                                        type="radio" name="ajouterMaintenance"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.ajouterMaintenance === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification de Maintenances</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani37" 
                                                                        type="radio" name="modifierMaintenance"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierMaintenance === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani38" 
                                                                        type="radio" name="modifierMaintenance"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierMaintenance === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de Maintenances</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani19" 
                                                                        type="radio" name="supprimerMaintenance"
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerMaintenance === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani40" 
                                                                        type="radio" name="supprimerMaintenance" 
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerMaintenance === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Roles </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des roles</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani41" 
                                                                        type="radio" name="listeRole"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeRole === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani42" 
                                                                        type="radio" name="listeRole"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeRole === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'une role</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani43" 
                                                                        type="radio" name="ajouterRole"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterRole === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani44" 
                                                                        type="radio" name="ajouterRole" 
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterRole === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification des roles</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani45" 
                                                                        type="radio" name="modifierRole"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierRole === this.state.active}
                                                                    />
                                                                        Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani46" 
                                                                        type="radio" name="modifierRole"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.modifierRole === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de roles</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani47" 
                                                                        type="radio" name="supprimerRole"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerRole === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani48" 
                                                                        type="radio" name="supprimerRole"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.supprimerRole === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Slides </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Slides</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani47" 
                                                                        type="radio" name="listeSlide"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeSlide === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani48" 
                                                                        type="radio" name="listeSlide"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeSlide === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'une Slide</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani49" 
                                                                        type="radio" name="ajouterSlide"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterSlide === this.state.active}
                                                                    />
                                                                        Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani50" 
                                                                        type="radio" name="ajouterSlide"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterSlide === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification des Slides</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani51" 
                                                                        type="radio" name="modifierSlide"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierSlide === this.state.active}
                                                                    />
                                                                        Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani52" 
                                                                        type="radio" name="modifierSlide"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange} 
                                                                        checked={this.state.modifierSlide === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de Slides</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani53" 
                                                                        type="radio" name="supprimerSlide" 
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerSlide === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani54" 
                                                                        type="radio" name="supprimerSlide"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerSlide === this.state.desactive} 
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Permissions relatives aux Utilisateurs </h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Utilisateurs</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani55" 
                                                                        type="radio" name="listeUtilisateur"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeUtilisateur === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani56" 
                                                                        type="radio" name="listeUtilisateur"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.listeUtilisateur === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Ajout d'un Utilisateur</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani57" 
                                                                        type="radio" name="ajouterUtilisateur"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterUtilisateur === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani58" 
                                                                        type="radio" name="ajouterUtilisateur"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.ajouterUtilisateur === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Modification des Utilisateurs</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani59" 
                                                                        type="radio" name="modifierUtilisateur"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierUtilisateur === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani60" 
                                                                        type="radio" name="modifierUtilisateur"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.modifierUtilisateur === this.state.desactive}
                                                                    />
                                                                        Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">Suppression de Utilisateurs</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani61" 
                                                                        type="radio" name="supprimerUtilisateur"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerUtilisateur === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani62" 
                                                                        type="radio" name="supprimerUtilisateur"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.supprimerUtilisateur === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="attribute-blocks">
                                                    <h5 className="f-w-600 mt-2 mb-1">Autres Permissions Possibles</h5>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Dashboard</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani63" 
                                                                        type="radio" name="dashboard"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.dashboard === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani64" 
                                                                        type="radio" name="dashboard"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.dashboard === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Commandes</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani65" 
                                                                        type="radio" name="commandes"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.commandes === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani66" 
                                                                        type="radio" name="commandes"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.commandes === this.state.desactive}
                                                                        />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Paiements</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani67" 
                                                                        type="radio" name="paiements"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.paiements === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani68" 
                                                                            type="radio" name="paiements"
                                                                            value={this.state.desactive}
                                                                            onChange={this.handleInputChange} 
                                                                            checked={this.state.paiements === this.state.desactive}
                                                                        />
                                                                        Désactivé
                                                                    </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Liste des Remboursements</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani69" 
                                                                        type="radio" name="remboursements" 
                                                                        value={this.state.active}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.remboursements === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani70" 
                                                                        type="radio" name="remboursements" 
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.remboursements === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label>Statistiques</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani71" 
                                                                        type="radio" name="statistique"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.statistique === this.state.active}
                                                                    />
                                                                    Activé
                                                                    </label>
                                                                <label className="d-block" >
                                                                    <input className="radio_animated" id="edo-ani72" 
                                                                        type="radio" name="statistique"
                                                                        value={this.state.desactive} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.statistique === this.state.desactive}
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-3 col-sm-4">
                                                            <label className="mb-0 sm-label-radio">logs</label>
                                                        </div>
                                                        <div className="col-xl-9 col-sm-8">
                                                            <div className="form-group m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani73" 
                                                                        type="radio" name="log"
                                                                        value={this.state.active} 
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.log === this.state.active}
                                                                    />
                                                                    Activé
                                                                </label>
                                                                <label className="d-block mb-0" >
                                                                    <input className="radio_animated" id="edo-ani74" 
                                                                        type="radio" name="log"
                                                                        value={this.state.desactive}
                                                                        onChange={this.handleInputChange}
                                                                        checked={this.state.log === this.state.desactive} 
                                                                    />
                                                                    Désactivé
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-3">
                                                    <button type="button" 
                                                    className="btn btn-primary"
                                                    onClick={this.handleSubmitChange}
                                                    disabled={this.state.isLoading}
                                                    >Enregistrer</button>
                                                </div>
                            
                                            </form>
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
        addrole: state.addrole,
        roledetails: state.roledetails,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newRole: (role) => {dispatch(roleActions.newRole(role))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add_roles)
