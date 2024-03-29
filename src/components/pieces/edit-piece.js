import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Select from 'react-select';
import * as pieceActions from "../../redux/actions/pieceActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Redirect, Router } from 'react-router-dom';
import * as roleActions from "../../redux/actions/roleActions";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const options = [
    {value: 'type1', label:'Type 1'},
    {value: 'type2', label:'Type 2'},
    {value: 'type3', label:'Type 3'}
]
export class Edit_piece extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            open: false,
            id: null,
            nom: '',
            type: '',
            montant: '',
            isLoading: false,
            visible: false,
            roles: null,
            loading: false
            
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
    handleChange = (type )=> {
        this.setState({type});
    }

    componentDidMount = () => {
        console.log('params', this.props.match.params)
        let param = this.props.match.params.id
        let rol = null

        this.setState({
            loading: true
        })
        this.props.pieceDetail(param)

        setTimeout(() => {
            console.log('piecedetail',this.props.piecedetail.piece)

            let type = {value: this.props.piecedetail.piece.type,
                label: this.props.piecedetail.piece.type}

            this.setState({
                id: this.props.piecedetail.piece.id,
                nom: this.props.piecedetail.piece.nom,
                type: type,
                montant: this.props.piecedetail.piece.montant
            })
        }, 1000) 
        
        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.modifierPiece;
            })
            if(this.props.roledetails.role[0].listePiece === '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                roles: rol,
                loading: false
            })
        }, 1000)
       
    }
    
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.editPiece(this.state)
        setTimeout(() => {
            // console.log(this.props.editpiece.isUpdated)
            // console.log(this.props.editpiece.isUpdated.isUpdated)
            if(this.props.editpiece.isUpdated === true){
                this.props.history.push('/pieces/list-piece');
            }else{
                
                this.props.history.push('/pieces/edit-piece/'+this.state.id);
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }

    render() {
        const {loading, roles, visible, isLoading, nom, type, localisation, lien, montant, description} = this.state
        // console.log(options)
        const customStyles = {
            input: (provided, state) => ({
                ...provided,
                margin: '0px',
                width: '617px'
            }),
        }
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
                        <Breadcrumb title="Modifier une piece " parent="pieces / Liste des pieces" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible === true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/pieces/list-piece" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation" encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Nom de piece</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text" 
                                                    name="nom"
                                                    value={nom}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4" ><span>*</span> type :</label>
                                                    <Select
                                                        styles={customStyles} 
                                                        name="type"
                                                        value={type}
                                                        onChange={this.handleChange}
                                                        options={options}
                                                        required="" 
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text" 
                                                    name="montant"
                                                    value={montant}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <ToastContainer />
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="button" 
                                                    className="btn btn-primary"
                                                    disabled={isLoading}
                                                    onClick={this.handleSubmitChange}
                                                    >Modifier</button>
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
        editpiece: state.editpiece,
        piecedetail: state.piecedetail,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editPiece: (piece) => {dispatch( pieceActions.editPiece(piece))},
        pieceDetail: (paramID) => {dispatch( pieceActions.pieceDetail(paramID))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit_piece))