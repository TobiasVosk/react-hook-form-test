import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Form from './form';

function App() {

  return (
    <Router>
      <Route path="" component={Form}></Route>
    </Router>
  );
}

export default App;
