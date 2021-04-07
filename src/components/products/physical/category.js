import React, { Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import CKEditors from 'react-ckeditor-component';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../assets/data/category';
import Datatable from '../../common/datatable';
import Data_categories from '../../common/dataTables/data_categories';

export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
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
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Ajouter une catégorie</button>
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Ajout d'une catégorie</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Nom de catégorie :</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4">Description :</label>
                                                        <div className="col-xl-8 col-sm-7 description-sm">
                                                            <CKEditors
                                                                activeclassName="p10"
                                                                content={this.state.content}
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChange
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text" className="col-form-label">Image de Catégorie :</label>
                                                        <input className="form-control" id="validationCustom02" type="file" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Enregistrer</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Fermer</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                        <Datatable
                                            multiSelectOption={true}
                                            myData={data}
                                            check={true}                       
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

export default Category

