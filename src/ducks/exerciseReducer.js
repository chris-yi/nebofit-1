import axios from 'axios';

const initialState = {
  exercises: [{text: 'BENCH PRESS', value: 'BENCH PRESS'}, {text: 'SQUAT', value: 'SQUAT'}, {text: 'DEADLIFT', value: 'DEADLIFT'}],
  inputs: [{
    workout: '',
    sets: 0,
    weight: 0,
    reps: 0,
    rpe: 0,
  }],
  sets: [],
  allLifts: []
};

const UPDATE_INPUTS = 'UPDATE_INPUTS';
const ADD_WORKOUT = 'ADD_WORKOUT';
const ADD_TO_SETS = 'ADD_TO_SETS';
const GET_ALL_LIFTS = 'GET_ALL_LIFTS';
const UPDATE_SETS = 'UPDATE_SETS';

function sortArray(newExercises){
  newExercises.sort((a, b) => {
    if(a.text < b.text) return -1;
    if(a.text > b.text) return 1;
    return 0;
  })
  return newExercises;
}

export const updateInputs = (inputs) => {
  return {
    type: UPDATE_INPUTS,
    payload: inputs,
  };
};

export const addWorkout = (workout) => {
  let newWorkout = {text: workout, value: workout}
  return {
    type: ADD_WORKOUT,
    payload: newWorkout,
  };
};

export const addToSets = (inputs, workout) => {
  let temp = {...inputs, workout};
  return {
    type: ADD_TO_SETS,
    payload: temp,
  };
};

export const getAllLifts = (userID) => {
  const data = axios.get(`/api/data/getAllLifts/${userID}`)
    .then(result => result.data)
  return {
    type: GET_ALL_LIFTS,
    payload: data,
  }
}

export const updateSets = (index, newSets) => {
  return {
    type: UPDATE_SETS,
    payload: newSets,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUTS:
      return Object.assign({}, state, {inputs: action.payload});

    case ADD_WORKOUT:
      let newWorkout = [... state.exercises, action.payload];
      newWorkout = sortArray(newWorkout);
      return Object.assign({}, state, {exercises: newWorkout});

    case ADD_TO_SETS:
      return Object.assign({}, state, {sets: [...state.sets, action.payload]});

    case GET_ALL_LIFTS + '_FULFILLED':
      let shortArr = ['BENCH PRESS', 'SQUAT', 'DEADLIFT'];
      let newExercises = state.exercises;
      for(let i=0; i<action.payload.length; i++){
        if(!shortArr.includes(action.payload[i].lift)){
          newExercises.push({text: action.payload[i].lift.toUpperCase(), value: action.payload[i].lift.toUpperCase()})
          shortArr.push(action.payload[i].lift)
        }
      }
      newExercises = sortArray(newExercises)
      return Object.assign({}, state, {allLifts: action.payload, exercises: newExercises});

    case UPDATE_SETS:
      return Object.assign({}, state, {sets: action.payload})
    default:
      return state;
  }
}