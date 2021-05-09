import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-responsive-modal';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import CKEditors from 'react-ckeditor-component';
import 'react-toastify/dist/ReactToastify.css';

export class Data_categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            open: false
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { open } = this.state;
        const { pageSize, myClass, check, multiSelectOption, pagination } = this.props;
        const { myData } = this.state

        const columns = [];
        for (var key in myData[0]) {

            let editable = this.renderEditable
            if (key === "image") {
                editable = null;
            }
            if (key === "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if(key === "order_status"){
                editable = null;
            }

            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }


        if (multiSelectOption == true) {
        columns.push(
            {
                Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                    onClick={
                        (e) => {
                            if (window.confirm('Are you sure you wish to delete this item?'))
                                this.handleRemoveRow()
                        }}>Delete</button>,
                id: 'delete',
                accessor: str => "delete",
                sortable: false,
                style: {
                    textAlign: 'center'
                },
                Cell: (row) => (
                    <div>
                        <span >
                            <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                onChange={e => this.selectRow(e, row.original.id)} />
                        </span>
                        <span>
                            <i className="fa fa-pencil"  style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }} onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal"></i>
                        </span>
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
                    
                ),
                accessor: key,
                style: {
                    textAlign: 'center'
                }
            }
        )
    } else {
        columns.push(
            {
                Header: <b>Action</b>,
                id: 'delete',
                accessor: str => "delete",
                Cell: (row) => (
                    <div>
                        <span onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                                let data = myData;
                                data.splice(row.index, 1);
                                this.setState({ myData: data });
                            }
                            toast.success("Successfully Deleted !")

                        }}>
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                            ></i>
                        </span>

                    <span><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i></span>
                </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
        )
    }

        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Data_categories
