import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Redirect to="/sign-in" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
