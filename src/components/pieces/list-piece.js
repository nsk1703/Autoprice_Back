import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_pieces from '../common/dataTables/data_pieces';
import * as pieceActions from "../../redux/actions/pieceActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";

export class List_piece extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            pieces: [],
            roles: null,
            visible: false,
            loading: false
        };
    }

    componentDidMount = () => {
        let listPieces = [];
        let listePiece= null;

        this.setState({
            loading: true
        })
        this.props.pieces();

        setTimeout(() => {
            console.log('piece',this.props.piece.pieces)
            this.props.piece.pieces.map(piece => {
                let item = {
                    ID: piece.id,
                    Nom: piece.nom,
                    Type: piece.type,
                    Montant: piece.montant,
                    etat: piece.etat,
                }

                listPieces.push(item);
            }) 
            this.setState({
                pieces: listPieces,
            })
            
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))
        
        setTimeout(() => {
            console.log('rolepiece',this.props.roledetails.role)
            if(this.props.roledetails.role){
                this.props.roledetails.role.map(rl => {
                    listePiece = rl.listePiece
                })
                if(this.props.roledetails.role[0].ajouterPiece === '1'){
                    this.setState({
                        visible: true
                    })
                }
                this.setState({
                    roles: listePiece,
                    loading: false,
                })
            }
        }, 1000)

    }

    render() {
        const {pieces, visible, roles, loading} = this.state
        // console.log('mach',pieces)
        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles === '1'){
                return (
                    <Fragment>
                        <Breadcrumb title="Liste des pieces" parent="pieces" />
                        <div className="container-fluid">
                            <div className="card">
                                {visible === true ?
                                    (
                                        <div className="card-header">
                                            <Link to="/pieces/add-piece" className="btn btn-primary">Ajout de piece</Link>
                                        </div>
                                    )
                                    : null
                                } 
                                <div className="card-body">
                                    <div className="clearfix"></div>
                                    <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                        <Data_pieces
                                            multiSelectOption={true}
                                            myData={pieces}
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
        piece: state.piece,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        pieces: () => {dispatch( pieceActions.pieces())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_piece)
