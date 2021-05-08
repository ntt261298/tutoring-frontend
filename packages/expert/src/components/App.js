import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { getInfo } from 'actions/user';
import pusher from 'utils/pusher';
import ModalContainer from './Modals';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import Workspace from './Workspace';
import Earnings from './Earnings';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(({ user }) => user.loggedIn);
  const [isPusherSetup, setIsPusherSetup] = useState(false);

  const connectPusher = async () => {
    const { result } = await dispatch(getInfo());
    if (result) {
      await pusher.connect();
      pusher.subscribe('account', {
        accountType: result.accountType,
        accountId: result.id,
      });
      pusher.bind('account', 'status_change', () => {});
      setIsPusherSetup(true);
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

  if (loggedIn && !isPusherSetup) {
    return (
      <Box
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Connecting...
      </Box>
    );
  }

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
        <Route path="/earnings">
          <Earnings />
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
