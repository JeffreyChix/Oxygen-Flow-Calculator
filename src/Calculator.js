import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
    constructor (props) {
        super(props)

        this.state = {
            num_records: {},
            den_records: {},
            numerator_entry: null,
            denominator_entry: null,
            n_keys: [],
            d_keys: [],
            numerator_res: "",
            denominator_res: "",
            final_answer: ""
        }
    }

    componentDidMount () {
        fetch("http://med.netsermon.com/api/numerator/read.php")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    num_records: data
                });
                for (var key in this.state.num_records.records) {
                    this.state.n_keys.push(parseInt(this.state.num_records.records[key].key))        
                }
            });

        fetch("http://med.netsermon.com/api/denominator/read.php")
            .then(response => response.json())
            .then (data => {
                this.setState({
                    den_records: data
                });

                for (var key in this.state.den_records.records) {
                    this.state.d_keys.push(parseInt(this.state.den_records.records[key].key))        
                }
            }
            );
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.name === "numerator_entry") {
            if (this.state.n_keys.includes(parseInt(event.target.value))) {
                this.setState({
                    errorMsg: ""
                })
                var valueIndex = this.state.n_keys.indexOf(parseInt(event.target.value))
                this.setState({
                    numerator_res: this.state.num_records.records[valueIndex].value
                });
            } else {
                if (event.target.value !== "") {
                    this.setState({
                        numerator_res: "",
                        errorMsg: "Numerator key does not exist"
                    })
                } else {
                    this.setState({
                        numerator_res: "",
                        errorMsg: ""
                    })
                }
            }
        }

        if (event.target.name === "denominator_entry") {
            if (this.state.d_keys.includes(parseFloat(event.target.value))) {
                this.setState({
                    errorMsg: ""
                })
                var valueIndex2 = this.state.d_keys.indexOf(parseInt(event.target.value))
                this.setState({
                    denominator_res: this.state.den_records.records[valueIndex2].value
                });
            } else {
                if (event.target.value !== "") {
                    this.setState({
                        denominator_res: "",
                        errorMsg: "Denominator key does not exist"
                    })
                } else {
                    this.setState({
                        denominator_res: "",
                        errorMsg: ""
                    })
                }
            }
        }

        if (this.state.numerator_res === "" || this.state.denominator_res === "") {
            this.setState({
                final_answer: ""
            })
        }
    }

    calculate = () => {
        this.setState({
            final_answer: this.state.numerator_res / this.state.denominator_res
        })
    }


    render() {
        const {numerator_res, denominator_res} = this.state;
        return (
            <div className="container-fluid p-4 box-center">
                <h3 className="text-center">Oxygen Flow Calculator</h3>
                <div className="row">
                    <p className="text-danger pl-3">
                        {
                            this.state.errorMsg
                        }
                    </p>
                </div>
                <div className="row">
                    <div className="col-2">Numerator: </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label className="block">1 A</label>
                            <input className="form-control-sm" name="numerator_entry" placeholder="Enter first value" onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label className="block">1 B</label>
                            <input className="form-control-sm" name="numerator_res" value={this.state.numerator_res} disabled></input>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">Denominator: </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label className="block">2 A</label>
                            <input className="form-control-sm" name="denominator_entry" placeholder="Enter second value" onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label className="block">2 B</label>
                            <input className="form-control-sm" name="denominator_res" value={this.state.denominator_res} disabled></input>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <button disabled={
                            (numerator_res === "" || denominator_res === "") ? true : false
                        } className="btn btn-success" onClick={this.calculate}>Calculate</button>
                    </div>
                    <div className="col-6">
                        <input className="form-control-sm" name="final_anwer" value={this.state.final_answer} disabled></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;

