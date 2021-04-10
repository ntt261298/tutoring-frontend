import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from 'actions/user';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Pricing from './Pricing';
import Profile from './Profile';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(({ user }) => user.loggedIn);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getInfo());
    }
  }, [loggedIn]);

  const renderRoutes = () => {
    if (!loggedIn) {
      return (
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
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
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      {renderRoutes()}
    </BrowserRouter>
  );
}

export default App;
