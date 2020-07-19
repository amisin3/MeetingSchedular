import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MeetingForm from "./components/MeetingForm";
import MainPage from "./components/MainPage";
import "./App.css";
import Alerts from "./components/Alerts";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Alerts />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/addmeeting" component={MeetingForm} />
    </Router>
  </Provider>
);

export default App;
