import React, { Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Chart } from "react-google-charts";
import {
    Line, Bar
} from 'react-chartjs-2';
import { lineChart, chartOptions, areaChart, areaOptions, barOptions, barChart, sellOption, sellData, salesOption, salesData } from '../../constants/chartData'
import Report_table from './report-table';
import BeatLoader from "react-spinners/BeatLoader";

export class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false
        };
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }
    render() {
        if(this.state.loading){
            return(
                <div style={{display: "flex", justifyContent: "center", 
                            alignItems: "center", width: "100%", height: "100vh"}}>
                   <BeatLoader color={"#EC1C5B"} loading={this.state.loading} size={50} />
                </div>
            )
        }else{
            return (
                <div>
                    <Breadcrumb title="Reports" parent="Reports" />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-8 col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Sales Summary</h5>
                                    </div>
                                    <div className="card-body sell-graph">
                                        <Line data={salesData} options={salesOption} width={700} height={305} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card report-employee">
                                    <div className="card-header">
                                        <h2>75%</h2>
                                        <h6 className="mb-0">Employees Satisfied</h6>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="ct-4 flot-chart-container">
                                            <Line data={lineChart} options={chartOptions} width={778} height={500} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Transfer Report</h5>
                                    </div>
                                    <div className="card-body">
                                        <div id="basicScenario" className="report-table">
                                            <Report_table />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Expenses</h5>
                                    </div>
                                    <div className="card-body expense-chart">
                                        <div className="chart-overflow" id="area-chart1" >
                                            <Line data={areaChart} options={areaOptions} width={778} height={308} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5> Sales / Purchase</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="sales-chart">
                                            <Bar data={barChart} options={barOptions} width={778} height={308} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Sales / Purchase Return</h5>
                                </div>
                                <div className="card-body">
                                    <div className="report-last-sm">
                                        <Line data={sellData} options={sellOption} width={700} height={300} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Reports
