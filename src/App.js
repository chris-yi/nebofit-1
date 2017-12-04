import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from "react-router-dom";

// ----- Component Imports ----- //
import Home from './Components/Home/Home'
import UserLanding from "./Components/UserLanding/UserLanding"
import Nutrition from "./Components/Nutrition/Nutrition"
import Sleep from "./Components/Sleep/Sleep"
import Hydration from './Components/Hydration/Hydration'
import Exercise from "./Components/Exercise/Exercise"
import Weight from "./Components/Weight/Weight"
import Analysis from "./Components/Analysis/Analysis"
import Profile from "./Components/Profile/Profile"


class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/UserLanding" component={UserLanding} />
        <Route path="/Nutrition" component={Nutrition} />
        <Route path="/Sleep" component={Sleep} />
        <Route path="/Hydration" component={Hydration} />
        <Route path="/Exercise" component={Exercise} />
        <Route path="/Weight" component={Weight} />
        <Route path="/Analysis" component={Analysis} />
        <Route path="/Profile" component={Profile} />
      </div>
    );
  }
}

export default App;
