import React, { Component, Fragment } from 'react'
import LoginTabset from './loginTabset';
import { ArrowLeft, Sliders } from 'react-feather';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import stats from '../../assets/images/dashboard/mini-autoprice.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class Login extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: false
        };
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                <div className="p-0 card-left" style={{float: "none", margin: "0 auto"}}>
                                    <div className="card ">
                                        {/* <div className=""> */}
                                            <img src={stats} className="Img-fluid" />
                                        {/* </div> */}
                                        {/* <Slider className="single-item" {...settings}>
                                            <div>
                                                <div>
                                                    <h3>Welcome to Multikart</h3>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>Welcome to Multikart</h3>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>Welcome to Multikart</h3>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                                </div>
                                            </div>
                                        </Slider> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="p-0 card-right " style={{float: "none", margin: "0 auto"}}>
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <LoginTabset />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <a href="https://react.pixelstrap.com/multikart" target="_blank" className="btn btn-primary back-btn"><ArrowLeft />back</a> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login
