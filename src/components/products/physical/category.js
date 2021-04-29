import React, { Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import CKEditors from 'react-ckeditor-component';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../assets/data/category';
import * as categoryActions from "../../../redux/actions/categoryActions";
import Datatable from '../../common/datatable';
import Data_categories from '../../common/dataTables/data_categories';
// import * as categoryActions from "../../../redux/actions/categoryActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export class Category extends Component {
    constructor(props) {
        super(props);
        let listCategories = []
        this.state = {
            isLoading: false,
            open: false,
            categories: [],
            nom: '',
            description: '',
            files: null
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

        this.props.categories()

        setTimeout(() => {
            console.log(this.props.category.categories)

            this.props.category.categories.map(category => {
                let item = {
                    image: <img src={category.image_urls} style={{width:50,height:50}}/>,
                    Nom: category.name,
                    Description: category.description
                }
                listCategories.push(item);
            })
            this.setState({
                categories: listCategories
            })
        }, 1000)
        this.state = {
            open: false,
            categories: listCategories
        };

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

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
        this.props.newCategory(this.state)
        setTimeout(() => {
            // console.log(this.props.addcategory.success)
            if(this.props.addcategory.success === true){
                this.onCloseModal();
                this.props.history.push('/products/physical/category');
            }else{
                // this.props.history.push('/products/physical/category');
                this.onOpenModal();
                this.setState({
                    isLoading: false
                })
            }
        }, 1000)
    }
    render() {
        const { open, categories, name, description, isLoading } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Categories" parent="Produits" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Liste des Catégories</h5>
                                </div>
                                <div className="card-body">
                                <ToastContainer />
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Ajouter une catégorie</button>
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Ajout d'une catégorie</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="col-form-label" >Nom de catégorie :</label>
                                                        <input type="text" className="form-control"
                                                            id="validationCustom0" 
                                                            name='nom'
                                                            value={name}
                                                            onChange={this.handleInputChange}
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Description :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <textarea className=" form-control " 
                                                                name="description" 
                                                                value={description} 
                                                                onChange={this.handleInputChange}
                                                                rows="5" cols="60"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text" className="col-form-label">Image de Catégorie :</label>
                                                        <input className="form-control col-xl-8 col-md-7" 
                                                            type="file" 
                                                            onChange={this.handleFileChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                            {/* this.onCloseModal('VaryingMdo') */}
                                                <button type="button" className="btn btn-primary"
                                                 disabled={isLoading}
                                                 onClick={this.handleSubmitChange}
                                                 >Enregistrer</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Fermer</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                        <Data_categories
                                            multiSelectOption={true}
                                            myData={categories}  
                                            pageSize={10} 
                                            pagination={true}
                                            class="-striped -highlight" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category,
        addcategory: state.addcategory

    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        categories: () => {dispatch( categoryActions.categories())},
        newCategory: (category) => {dispatch(categoryActions.newCategory(category))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category))

