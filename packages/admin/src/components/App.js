import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalContainer from './Modals';
import SignIn from './SignIn';
import Home from './Home';
import Experts from './Experts';
import Users from './Users';
import Feedback from './Feedback';
import SubscriptionPackage from './SubscriptionPackage';
import Statistics from './Statistics';


function App() {
  const loggedIn = useSelector(({ user }) => user.loggedIn);

  const renderRoutes = () => {
    if (!loggedIn) {
      return (
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Redirect to="/sign-in" />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/experts">
          <Experts />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/subscription-packages">
          <SubscriptionPackage />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      {renderRoutes()}
      <ModalContainer />
    </BrowserRouter>
  );
}

export default App;
