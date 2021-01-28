import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Form1 from "./form1";
import Form2 from "./form2";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Form1} />
      <Route exact path="/form2" component={Form2} />
    </Router>
  );
}

export default App;
