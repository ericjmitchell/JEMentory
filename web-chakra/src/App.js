import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { PrivateRoute } from './helpers/PrivateRoute';
import Login from './features/User/Login';
import Dashboard from './features/User/Dashboard';
import ItemView from './features/Item/ItemView';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <PrivateRoute exact component={Dashboard} path="/" />
          <PrivateRoute component={ItemView} path="/item" />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
