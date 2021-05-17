import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_slide from './tabset-slide';
import {connect} from "react-redux";
import Select from 'react-select';
import * as slideActions from "../../redux/actions/slideActions";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";


const typeChoices = [
    {value: 'home', label:'Home'},
    {value: 'produit', label:'Produit'},
]

const formatChoices = [
    {value: 'image', label: 'Image'},
    {value: 'video', label: 'Video'}
]

export class Create_slide extends Component {
    constructor(props){
        super(props);

        this.state = {
           type: '',
           format: '',
           images: null,
           isLoading: false, 
        }

        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }
  
    handleTypeChange = (type)=> {
        this.setState({type});
    }

    handleFormatChange = (format)=> {
        this.setState({format});
    }

    handleFileChange = (e)=> {
        this.setState({
            images: e.target.files[0]
        });
    }
    
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.newSlide(this.state)
        setTimeout(() => {
            // console.log(this.props.addmachine.success)
            if(this.props.addslide.success === true){
                this.props.history.push('/slides/list-slide');
            }else{
                this.props.history.push('/slides/create-slide');
                this.setState({
                    isLoading: false
                });
            }
        }, 1000)
       

    }
    render() {
        const {type, format, isLoading} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Ajouter un slide" parent="Slides" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                <Link type="button" to="/slides/list-slide" 
                                    className="btn btn-primary">Retour</Link>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation user-add">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Format</label>
                                            <Select className="col-xl-8 col-md-7"
                                                name="Format"
                                                value={format}
                                                onChange={this.handleFormatChange}
                                                options={formatChoices}
                                                required="" 
                                            />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4" ><span>*</span> type :</label>
                                            {/* <div className="col-xl-8 col-md-7"> */}
                                                <Select className="col-xl-8 col-md-7"
                                                    name="type"
                                                    value={type}
                                                    onChange={this.handleTypeChange}
                                                    options={typeChoices}
                                                    required="" 
                                                />
                                            {/* </div> */}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span>Image de Catégorie :</label>
                                            <input className="form-control col-xl-8 col-md-7" 
                                                type="file" 
                                                onChange={this.handleFileChange}
                                            />
                                        </div>
                                        <div className="offset-xl-3 offset-sm-4 mt-3">
                                            <button type="button" 
                                                className="btn btn-primary"
                                                disabled={isLoading}
                                                onClick={this.handleSubmitChange}
                                            >Enregister</button>
                                        </div>
                                    </form>
                                </div>
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
        addslide: state.addslide,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newSlide: (slide) => {dispatch( slideActions.newSlide(slide))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_slide)
