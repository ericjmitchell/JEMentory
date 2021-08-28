import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './features/User/Login';
import Dashboard from './features/User/Dashboard';
import ItemView from './features/Item/ItemView';
import { PrivateRoute } from './helpers/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <PrivateRoute exact component={Dashboard} path="/" />
          <PrivateRoute component={ItemView} path="/item" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
