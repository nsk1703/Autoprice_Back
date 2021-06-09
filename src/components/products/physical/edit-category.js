import React, { Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import { Link } from "react-router-dom";
import CKEditors from 'react-ckeditor-component';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../assets/data/category';
import * as categoryActions from "../../../redux/actions/categoryActions";
import Datatable from '../../common/datatable';
import Data_categories from '../../common/dataTables/data_categories';
import * as roleActions  from "../../../redux/actions/roleActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";


export class Edit_category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            categories: [],
            name: '',
            description: '',
            files: null,
            visible: false,
            roles: null,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }

    componentDidMount = ()  => {
        let param = this.props.match.params.id
        let rol = null;
        this.setState({
            loading: true
        })

        this.props.detailCategory(param)

        setTimeout(() => {
            console.log('catedetail', this.props.catdetails.category)
            this.setState({
                id: this.props.catdetails.category.category_id,
                name: this.props.catdetails.category.name,
                description: this.props.catdetails.category.description
            })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.modifierCategorie;
            })
            if(this.props.roledetails.role[0].listeCategorie == '1'){
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

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFileChange = (e)=> {
        this.setState({
            files: e.target.files[0]
        });
    }

    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        // console.log(this.state.AllOptions)
        this.props.editCategory(this.state)
        setTimeout(() => {
            console.log(this.props.editcategory)
            if(this.props.editcategory.isUpdated === true){
                this.props.history.push('/products/physical/category');
                window.location.reload()
            }else{
                // this.props.history.push('/products/physical/category');
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }
    
    render() {
        const {loading, roles, visible, isLoading, name, description} =this.state
        // console.log(options)
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
                        <Breadcrumb title="Modifier une Categorie " parent="Categories / Liste des Categories" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {visible == true ?
                                            (
                                                <div className="card-header">
                                                    <Link type="button" to="/products/physical/category" className="btn btn-primary">Retour</Link>
                                                </div>
                                            ):
                                            null
                                        }
                                        <div className="card-body">
                                            <form className="needs-validation" encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4"><span>*</span> Nom de Categorie</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                    id="validationCustom0" type="text" 
                                                    name="name"
                                                    value={name}
                                                    onChange={this.handleInputChange}
                                                    required="" />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4">Description du produit :</label>
                                                    {/* <div className="form-control col-xl-8 col-md-7 description-sm"> */}
                                                        <textarea className=" form-control col-xl-8 col-md-7" 
                                                            name="description" 
                                                            value={description || ""} 
                                                            onChange={this.handleInputChange}
                                                            rows="10" cols="92"
                                                        />
                                                    {/* </div> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="message-text" className="col-form-label">Image de Catégorie :</label>
                                                    <input className="form-control col-xl-8 col-md-7" 
                                                        type="file" 
                                                        onChange={this.handleFileChange}
                                                    />
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
        roledetails: state.roledetails,
        editcategory: state.editcategory,
        catdetails: state.catdetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
        editCategory: (categoryID) => {dispatch(categoryActions.editCategory(categoryID))},
        detailCategory: (categoryid) => {dispatch(categoryActions.detailCategory(categoryid))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_category)