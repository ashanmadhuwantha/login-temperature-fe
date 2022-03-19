import React, { Component } from "react";
import { authService } from "../services/authService";
import moment from 'moment'

export default class Dashboard extends Component {
  state = {
    userTemps1: [],
    userTemps2: [],
    hottest: false
  };

  componentDidMount() {
    this.getTemp(false);
  }

  onClickHottest(){
      this.getTemp(true)
  }

  getTemp = (hottest) =>{
    authService.getTemp(hottest).then((data) => {
      console.log(data);
      if (data && data.status == 200) {
        this.setState({
          userTemps1: data.data.tempDetails1,
          userTemps2: data.data.tempDetails2,
        });
        // this.props.history.push('temp-dashboard')
      }
      console.log(this.state.userTemps1);
    });
  }
  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.user[field] = value;
    this.setState(newState);
  };

  render() {
    const { tempDetails } = this.state.userTemps1;
    return (
      <React.Fragment>
        <h1>Login Temperatures</h1>
        <hr></hr>
        <div className="row">
          <div className="col-8"></div>
          <div className="col-2">
            <button onClick={()=>this.getTemp(true)} className="btn-warning">Hottest First</button>
          </div>
          <div className="col-2">
            <button onClick={()=>this.getTemp(false)} className="btn-success">Reset Order</button>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-6">
            <h3>Melbourne</h3>
            <hr></hr>
          </div>
          <div className="col-6">
            <h3>Colombo</h3>
            <hr></hr>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
              { this.state.userTemps1.map((temp, index)=>{
                  return( <div className="row" key={index}>
                  <div className="col-6">{moment(temp.created_at).format('llll')}</div>
                  <div className="col-2">{temp.city_1_temp_fahrenheit} °F</div>
                  <div className="col-2">{temp.city_1_temp_celsius} °C</div>
                </div>);
                             
              })}
          </div>
          <div className="col-6">
          { this.state.userTemps2.map((temp, index)=>{
                  return( <div className="row" key={index}>
                  <div className="col-6">{moment(temp.created_at).format('llll')}</div>
                  <div className="col-2">{temp.city_2_temp_fahrenheit} °F</div>
                  <div className="col-2">{temp.city_2_temp_celsius} °C</div>
                </div>);
                             
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
