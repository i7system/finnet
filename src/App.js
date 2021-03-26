import React, { useState } from "react";
import CriarConta from "./components/CriarConta";
import Login from "./components/Login";
import Home from './components/Home'
import { Account } from './components/Accounts';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import ConfirmarConta from "./components/ConfirmarConta";
import EsqueciSenha from "./components/EsqueciSenha";
import Amplify from 'aws-amplify';
import amplify_config from './amplify-config';

Amplify.configure(amplify_config);


function App() {
  return (
    <>
      <Account>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/criarconta" component={CriarConta} />
            <Route exact path="/confirmarconta" component={ConfirmarConta} />
            <Route exact path="/esquecisenha" component={EsqueciSenha} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" >
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </Account>
    </>
  );
}

export default App;
