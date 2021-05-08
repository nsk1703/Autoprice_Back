import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import Data_slides from '../common/dataTables/data_slides';
import * as slideActions from "../../redux/actions/slideActions";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

export class List_slide extends Component {
    constructor(props) {
        super(props);
        let listSlides = [];

        this.state = {
            open: false,
            slides: []
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
        this.state = {
            open: false,
            slides: listSlides
        };
    }
    render() {
        const {slides} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Liste des Slides" parent="Slides" />
                <div className="container-fluid">
                    <div className="card">
                        {/* <div className="card-header">
                            <h5>User Details</h5>
                        </div> */}
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/slides/create-slide" className="btn btn-primary">Créer un slide</Link>
                            </div>
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
    }
}

const mapStateToProps = (state) => {
    return {
        slide: state.slide
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        slides: () => {dispatch(slideActions.slides())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List_slide)
