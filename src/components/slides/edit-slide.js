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

        this.props.detailslide(this.props.match.params.id)

        setTimeout(() => {
            console.log(this.props.slidetails)

            let type = {value: this.props.slidetails.slide.slide.type, 
                        label: this.props.slidetails.slide.slide.type}

            let format = {value: this.props.slidetails.slide.slide.format, 
                          label: this.props.slidetails.slide.slide.format}

            // console.log('slide',this.props.slide)
            // console.log('images',this.props.slide.filePath)
            // console.log(' type ', type);
            // console.log(this.state.images)

            this.setState({
                id: this.props.slidetails.slide.slide.id,
                type: type ? type : '',
                format: format ? format : '',
                actualFile: this.props.slidetails.slide.slide.filePath,
                // images: this.state.images ? this.state.images : this.props.slide.fileName 
            })
        },1000)

        
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
                                            <label className="col-xl-3 col-md-4"><span>*</span>Image de Catégorie :</label>
                                            <input className="form-control col-xl-8 col-md-7" 
                                                type="file" 
                                                onChange={this.handleFileChange}
                                            /> 
                                            <img className="offset-xl-3 offset-sm-4 mt-2" src={ images ? images : actualFile} style={{width: '100px', height: '100px'}} />
                                        </div>
                                        <div className="offset-xl-3 offset-sm-4 mt-3">
                                            <button type="button" 
                                                className="btn btn-primary"
                                                onClick={this.handleSubmitChange}
                                                disabled={isLoading}
                                            >Modifier</button>
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
        editslide: state.editslide,
        slidetails: state.slidetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editSlide: (slide) => {dispatch( slideActions.editSlide(slide))},
        detailslide: (slideid) => {dispatch( slideActions.detailslide(slideid))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_slide)
