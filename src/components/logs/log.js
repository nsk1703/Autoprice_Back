import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import * as logActions from "../../redux/actions/logActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

export class Log extends Component {
    constructor(props) {
        super(props);
        let listLogs = [];

        this.state = {
            open: false,
            logs: []
        };

        this.props.logs();

        setTimeout(() => {
            console.log(this.props.log.logss)

            this.props.log.logss.map(log => {
                let item = {
                    ID: '#' + log.id,
                    Type: log.type,
                    etat:log.etat,
                    date: log.dateLogs,
                    description:log.description,
                    machine :log.machine_id,
                    utilisateur :log.utilisateurid
                }
                listLogs.push(item);
            })
            this.setState({
                logs: listLogs
            })
        }, 1000)
        this.state = {
            open: false,
            logs: listLogs
        };
    }
    render() {
        const {logs} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des Journaux" parent="Journaux"/>
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            {/* <div className="btn-popup pull-right">
                                <Link to="/logs/create-log" className="btn btn-primary">Créer un journal</Link>
                            </div> */}
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Datatable
                                    multiSelectOption={true}
                                    myData={logs}
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
    }
}

const mapStateToProps = (state) => {
    return {
        log: state.log
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        logs: () => {dispatch( logActions.logs())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
