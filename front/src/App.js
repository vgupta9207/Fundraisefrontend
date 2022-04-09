import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DetailCard from './DetailCard'
import Header from './Header';
import UserInfo from './UserInfo';
import DepositInput from './DepositInput';
import axios from 'axios';
import { useReducer } from 'react';
import AllFundraises from './AllFundraises';
import React from 'react';


axios.defaults.baseURL = "http://localhost:8081";

//initialState is the default state of the app
const initialState = { currentUser: '', refetch: false, active: { title: '', param: '' } };
export const types = {
  'SET_USER': 'SET_USER',
  "SET_ACTIVE": 'SET_ACTIVE',
  "SET_REFETCH": 'SET_REFETCH'
}
//useReducer is use to handle multiple states easily
//This works for setting the current user and its state
function reducer(state, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, currentUser: action.user };
    case types.SET_ACTIVE:
      return { ...state, active: action.active };
    case types.SET_REFETCH:
      return { ...state, refetch: action.refetch };
    default:
      return state
  }
}


function App() {
  //useReducer is use to handle multiple states easily
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <Header dispatch={dispatch} />
      <div className="container">
        <UserInfo state={state} />
        {/*state.active.title value change using dispatch function which takes type and payload */}
        {state.active.title === '' && <AllFundraises dispatch={dispatch} state={state} />}
        
        {state.active.title === 'deposit' && <DepositInput state={state} dispatch={dispatch} />}
        {state.active.title === 'donate' && <DetailCard state={state} dispatch={dispatch} />}

      </div>
    </div>
  );
}

export default App;
