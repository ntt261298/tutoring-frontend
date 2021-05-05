import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from 'actions/user';
import pusher from 'utils/pusher';
import ModalContainer from './Modals';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import Workspace from './Workspace';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(({ user }) => user.loggedIn);

  const connectPusher = async () => {
    const { result } = await dispatch(getInfo());
    if (result) {
      pusher.connect();
      pusher.subscribe('account', {
        accountType: result.accountType,
        accountId: result.id,
      });
      pusher.bind('account', 'status_change', () => {});
    }
  };

  useEffect(() => {
    if (loggedIn) {
      connectPusher();
    }

    return () => {
      pusher.unbind('account', 'status_change');
      pusher.unsubscribe('account');
      pusher.disconnect();
    };
  }, [loggedIn]);

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
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/workspace">
          <Workspace />
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
