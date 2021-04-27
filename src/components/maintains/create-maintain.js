// import React, { Component,Fragment } from 'react'
// import Breadcrumb from '../common/breadcrumb';
// import Tabset_maintain from './tabset-maintain';
// import CKEditors from 'react-ckeditor-component';
// import * as maintenanceActions from "../../redux/actions/maintenanceActions";
// import {connect} from "react-redux";

// export class Create_maintain extends Component {
//         constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             nom: '',
//             type: '',
//             dateMaintenance: '',
//             montant: '',
//             description: '',
//             machine_id: ''
//         };

        
//         this.handleInputChange = this.handleInputChange.bind(this)
//         this.handleChange = this.handleChange()
//         this.handleSubmitChange = this.handleSubmitChange.bind(this)
//         this.handleCkeditorChange = this.handleCkeditorChange.bind(this)

//         this.props.machines();

//         setTimeout(() => {
//             console.log(this.props.machine.machines)

//             this.props.machine.machines.map(machine => {
//                 // console.log('i',machine.id)
//                 let item = {
//                     id: machine.id,
//                     Nom: machine.nom
//                 }
//                 listMachines.push(item);
//             })
            
//             // console.log('maaa',listMachines)
//             // console.log(lis)
//             listMachines.map(listMachine => {
//                 let option = 
//                     {value:listMachine.id, label: listMachine.Nom }
                
//                 // console.log(option)
//                 options.push(option)
//             })
//             console.log('11111',options)
          
//             this.setState({
//                 selectedOption: options
//             })
//         }, 1000)
//     }
//     handleInputChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }
//     handleSubmitChange = (e) => {
//         e.preventDefault();
//         // console.log(this.state.AllOptions)
//         this.props.newMaintenance(this.state)
       

//     }
//     render() {
//         return (
//             <Fragment>
//                 <Breadcrumb title="Effectuer une maintenance" parent="Maintenance" />
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h5> Effectuer une maintenance</h5>
//                                 </div>
//                                 <div className="card-body">
//                                     <form className="needs-validation user-add" noValidate="">
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4"><span>*</span> Nom</label>
//                                             <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="text" required="" />
//                                         </div>
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4"><span>*</span> Montant</label>
//                                             <input className="form-control col-xl-8 col-md-7" id="validationCustom0" type="number" required="" />
//                                         </div>
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4"><span>*</span> Date de Maintenance</label>
//                                             <input className="form-control col-xl-8 col-md-7" id="validationCustom1" type="date" required="" />
//                                         </div>
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4"><span>*</span> Etat</label>
//                                             <input className="form-control col-xl-8 col-md-7" id="validationCustom3" type="text" required="" />
//                                         </div>
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4" >type :</label>
//                                             {/* <div className=""> */}
//                                                 <select className="form-control col-xl-8 col-md-7 digits" id="exampleFormControlSelect1">
//                                                     <option>lorem</option>
//                                                     <option>ipsum</option>
//                                                     <option>dolar</option>
//                                                     <option>vaug</option>
//                                                 </select>
//                                             {/* </div> */}
//                                         </div>
//                                         <div className="form-group row">
//                                             <label className="col-xl-3 col-md-4" >Nom de machine :</label>
//                                             {/* <div className="col-xl-8 col-md-7"> */}
//                                                 <select className="form-control col-xl-8 col-md-7 digits" id="exampleFormControlSelect1">
//                                                     <option>machine01</option>
//                                                     <option>machine02</option>
//                                                     <option>machine03</option>
//                                                     <option>machine04</option>
//                                                 </select>
//                                             {/* </div> */}
//                                         </div>
//                                         <div className="form">
//                                             <div className="form-group row">
//                                                 <label className="col-xl-3 col-md-4">Description :</label>
//                                                 <div className=" form-control col-xl-8 col-md-7 description-sm">
//                                                     <CKEditors
//                                                         activeclassName="p10"
//                                                         content={this.state.content}
//                                                         events={{
//                                                             "blur": this.onBlur,
//                                                             "afterPaste": this.afterPaste,
//                                                             "change": this.onChange
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="offset-xl-3 offset-sm-4">
//                                             <button type="button" className="btn btn-primary">Enregister</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Fragment>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         maintenance: state.maintenance,
//         machine: state.machine
//     }
// }
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         maintenances: (maintenance) => {dispatch( maintenanceActions.newMaintenance(maintenance))},
//         machines: () => {dispatch( machineActions.machines())}
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(List_maintain)
