import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import * as roleActions  from "../../../redux/actions/roleActions";
import {connect} from "react-redux";

export class Data_users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            deletable: false,
            updatable: false
        }
    }

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
        // console.log(selectedValues)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        }
        for(var i=0; i<selectedValues.length; i++){
            axios.delete(`utilisateur/${selectedValues[i]}`, config)
            .then(() => {
                axios.get('/utilisateurs')
                    .then((response) => {
                        const {utilisateurs} = response.data
                        this.setState({
                            myData: utilisateurs
                        })
                    })
            })
        }
        window.location.reload()
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

    componentDidMount = () => {
        this.props.actionsdetailRole(localStorage.getItem('roles'))
        
        setTimeout(() => {
            if(this.props.roledetails.role[0]){
                if(this.props.roledetails.role[0].supprimerUtilisateur === '1'){
                    this.setState({
                        deletable: true
                    })
                }
                if(this.props.roledetails.role[0].modifierUtilisateur === '1'){
                    this.setState({
                    updatable: true
                    })
                }
            }
        }, 1000)
    }

    render() {
        const { pageSize, myClass, check, multiSelectOption, pagination } = this.props;
        const { myData, deletable, updatable } = this.state

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
            if((deletable == true) && (updatable == true)){
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
                                    <input type="checkbox" name={row.original.ID} 
                                    defaultChecked={this.state.checkedValues.includes(row.original.ID)}
                                        onChange={e => this.selectRow(e, row.original.ID)} />
                                </span>
                                <span><Link to={`/users/edit-user/${row.original.ID}`}>
                                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
                                </Link></span>
                            </div>
                            
                        ),
                        accessor: key,
                        style: {
                            textAlign: 'center'
                        }
                    }
                )
            }else if(deletable == true && updatable == false){
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
                                    <input type="checkbox" name={row.original.ID} 
                                    defaultChecked={this.state.checkedValues.includes(row.original.ID)}
                                        onChange={e => this.selectRow(e, row.original.ID)} />
                                </span>
                            </div>
                            
                        ),
                        accessor: key,
                        style: {
                            textAlign: 'center'
                        }
                    }
                )
            }else if(deletable ==  false && updatable == true){
                columns.push(
                    {
                        Cell: (row) => (
                            <div>
                                <span><Link to={`/users/edit-user/${row.original.ID}`}>
                                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
                                </Link></span>
                            </div>
                        ),
                        style: {
                            textAlign: 'center'
                        }
                    }
                )
            }
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

const mapStateToProps = (state) => {
    return {
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Data_users)
