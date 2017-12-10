import React, { Component } from "react";
import './Hydration.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import {Bar} from "react-chartjs-2"
import {connect} from 'react-redux';
import {getTodayNutrition} from '../../ducks/databaseReducer';
import Hamburger from "../Hamburger/Hamburger"


class Hydration extends Component {
  constructor(){
    super()

this.state = {
  pulse: null,
  percent: 0
}

this.percentAnimation = this.percentAnimation.bind(this)

  }
  componentDidMount(){
    this.setState({
      pulse: setInterval(this.percentAnimation, 12)
    })
 }

 killInterval(){
    clearInterval(this.state.pulse)
 }

 percentAnimation(){
  let hydration = ((Math.round(this.props.todayData.todayNutrition.water * 0.033814022558919)) / this.props.userData.goal_hydration) * 100;
  if (this.state.percent < hydration){
     this.setState({
       percent: ++this.state.percent
})
} else {
  this.killInterval()
  console.log(this.state.pulse)
}

}

  render() {
    let data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Hydration',
          backgroundColor: 'rgb(95, 197, 212)',
          borderColor: 'rgb(95, 197, 212)',
          borderWidth: 1,
          data: [(Math.round(this.props.todayData.todayNutrition.water*0.033814022558919))]
        }
      ]
    }
    console.log(this.state.percent)
    return (
      <div className="Hydration">
      <Hamburger/>
        <div className="Hydration_Header">
          <div>
          <i className="fa fa-tint" aria-hidden="true"></i>
            <h1 className="Hydration_Today">Hydration</h1>
          </div>
          <div className='Hydration_Header_Buffer'></div>
        </div>
        <div className="Hydration_Metrics">
          <div className="Hydration_Metric">
            <div className="Hydration_Hydration">
              <hr />
              <h2>Today</h2>
              <div className="Hydration_Chart">
                <Circle
                  percent={this.state.percent}
                  strokeWidth="3"
                  strokeColor="#5FC5D4"
                  strokeLinecap="round"
                />

                <div className="Hydration_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>{(Math.round(this.props.todayData.todayNutrition.water*0.033814022558919))}</p>
                  <p>oz</p>
                </div>
                <div className="Hydration_Goal_Reminder">
                    <h1>12oz to go</h1>
                  </div>
                  <div className="chart">
                    <Bar
                        data={data}
                        width={25}
                        height={100}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {todayData, userData} = state.databaseReducer
  return {
    todayData,
    userData
  }
}

export default connect(mapStateToProps, {getTodayNutrition})(Hydration);