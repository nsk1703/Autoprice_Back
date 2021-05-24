import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_slides from '../common/dataTables/data_slides';
import * as slideActions from "../../redux/actions/slideActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import * as roleActions  from "../../redux/actions/roleActions";

export class List_slide extends Component {
    constructor(props) {
        super(props);
        let listSlides = [];
        let rol = null

        this.state = {
            open: false,
            slides: [],
            roles: null,
            visible: false
        };

        this.props.slides();

        setTimeout(() => {
            console.log(this.props.slide.slides)

                this.props.slide.slides.map(slide => {
                    let item = {
                        id: slide.id,
                        image: <img src={slide.filePath} style={{width:50,height:50}}/>,
                        Type: slide.type,
                        format:slide.format,
                    }
                    listSlides.push(item);
                })
                this.setState({
                   slides: listSlides
                })
        }, 1000)

        this.props.actionsdetailRole(localStorage.getItem('roles'))

        setTimeout(() => {

            this.props.roledetails.role.map(rl => {
                rol = rl.listeSlide;
            })
            this.setState({
                roles: rol
            })
            if(this.props.roledetails.role[0].ajouterSlide == '1'){
                this.setState({
                    visible: true
                })
            }
        }, 1000)
        
        this.state = {
            open: false,
            slides: listSlides,
            roles: rol
        };
    }
    render() {
        const {slides, visible, roles} = this.state
        if(roles == '1'){
            return (
                <Fragment>
                    <Breadcrumb title="Liste des Slides" parent="Slides" />
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                {visible == true ?
                                    (
                                        <div className="btn-popup pull-right">
                                            <Link to="/slides/create-slide" className="btn btn-primary">Ajouter un slide</Link>
                                        </div>
                                    ):
                                    null
                                }
                                <div className="clearfix"></div>
                                <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                    <Data_slides
                                        multiSelectOption={true}
                                        myData={slides}
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

const mapStateToProps = (state) => {
    return {
        slide: state.slide,
        roledetails: state.roledetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        slides: () => {dispatch(slideActions.slides())},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_slide)
