import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import {connect} from "react-redux";
import Select from 'react-select';
import * as slideActions from "../../redux/actions/slideActions";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import * as roleActions  from "../../redux/actions/roleActions";
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from 'react-toastify';

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
           visible: false,
           roles: null,
           loading: false
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
            // console.log(this.props.addslide.success)
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

    componentDidMount = () => {
        let rol = null;
        this.setState({
            loading: true
        })
        this.props.actionsdetailRole(localStorage.getItem('roles'))
        
        setTimeout(() => {
            this.props.roledetails.role.map(rl => {
                rol = rl.ajouterSlide;
            })
            if(this.props.roledetails.role[0].listeSlide == '1'){
                this.setState({
                    visible: true
                })
            }
            this.setState({
                roles: rol,
                loading: false
            })
        }, 1000)

    }

    render() {
        const {loading, roles, visible, type, format, isLoading} = this.state
        if(loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={loading} size={50} />
                </div>
            )
        }else{
            if(roles == '1'){
                return (
                    <Fragment>
                        <Breadcrumb title="Ajouter un slide" parent="Slides" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                    {visible == true ?
                                        (
                                            <div className="card-header">
                                                <Link type="button" to="/slides/list-slide" 
                                                    className="btn btn-primary">Retour</Link>
                                            </div>
                                        ):
                                        null
                                    }
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
                                                <ToastContainer />
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
            }else{
                return (
                    <Fragment>

                    </Fragment>
                )
            }
        }
    }
}
const mapStateToProps = (state) => {
    return {
        addslide: state.addslide,
        roledetails: state.roledetails,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        newSlide: (slide) => {dispatch( slideActions.newSlide(slide))},
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_slide)
