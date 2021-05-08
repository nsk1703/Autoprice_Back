import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_slide from './tabset-slide';
import {connect} from "react-redux";
import Select from 'react-select';
import * as slideActions from "../../redux/actions/slideActions";
import { withRouter } from 'react-router';


const typeChoices = [
    {value: 'Home', label:'Home'},
    {value: 'Produit', label:'Produit'},
]

const formatChoices = [
    {value: 'Image', label: 'Image'},
    {value: 'Video', label: 'Video'}
]

export class Edit_slide extends Component {
    constructor(props){
        super(props);

        this.state = {
           id: '',
           type: '',
           format: '',
           images: null,
           actualFile: null,
           isLoading: false, 
        }

        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)

    }
  
    componentDidMount = () => {
        let type = {value: this.props.slide.type, label: this.props.slide.type}
        let format = {value: this.props.slide.format, label: this.props.slide.format}

        // console.log('slide',this.props.slide)
        // console.log('images',this.props.slide.filePath)
        // console.log(' type ', type);
        console.log(this.state.images)

        this.setState({
            id: this.props.slide.id,
            type: type ? type : '',
            format: format ? format : '',
            actualFile: this.props.slide.filePath,
            // images: this.state.images ? this.state.images : this.props.slide.fileName 
        })
    }


    handleTypeChange = (type)=> {
        this.setState({type});
    }

    handleFormatChange = (format)=> {
        this.setState({format});
    }

    handleFileChange = (e)=> {
        if(!this.state.images){
            this.setState({
                images: e.target.files[0]
            });
        }
    }
    
    handleSubmitChange = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.props.editSlide(this.state)
        setTimeout(() => {
            // console.log(this.props.editslidecess)
            if(this.props.editslide.isUpdated.isUpdated === true){
                this.props.history.push('/slides/list-slide');
            }else{
                this.props.history.push('/slides/edit-slide/'+this.state.id);
                this.setState({
                    isLoading: false
                });
            }
        }, 1000)
       

    }

    render() {
        const {type, format, actualFile, images, isLoading} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Ajouter un slide" parent="Slides" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Modifier le slide</h5>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation">
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
                                            <label htmlFor="message-text" className="col-form-label"><span>*</span>Image de Catégorie :</label>
                                            <input className="form-control col-xl-8 col-md-7" 
                                                type="file" 
                                                onChange={this.handleFileChange}
                                            />
                                            {/* <img src={ images ? images : actualFile} style="width: 50px; height: 50px" /> */}
                                        </div>
                                        <div className="pull-right">
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
const mapStateToProps = (state, props) => {
    // console.log(props.match.params.id)
    console.log(state.slide.slides)

    return {
        slide: state.slide.slides.find(sly => sly.id == props.match.params.id),
        editslide: state.editslide
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editSlide: (slide) => {dispatch( slideActions.editSlide(slide))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_slide)
