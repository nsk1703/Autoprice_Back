import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import * as logActions from "../../redux/actions/logActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions from "../../redux/actions/roleActions";
import { Data_logs } from '../common/dataTables/data_logs';
import Datatable from '../common/datatable';

export class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            logs: [],
            roles: null
        };
    }

    componentDidMount = () => {
        let listLogs = [];
        let rol = null

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

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.log;
            })
            this.setState({
                roles: rol
            })
        }, 1000)
    }

    render() {
        const {logs, roles} = this.state
        if(roles == '1'){
            return (
                <Fragment>
                    <Breadcrumb title="Liste des Logs" parent="Logs"/>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <div className="clearfix"></div>
                                <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                    <Data_logs
                                        multiSelectOption={true}
                                        myData={logs}
                                        pageSize={10}
                                        pagination={true}
                                        check={false}
                                        class="-striped -highlight"
                                    />
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
        log: state.log,
        roledetails: state.roledetails,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        logs: () => {dispatch( logActions.logs())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
