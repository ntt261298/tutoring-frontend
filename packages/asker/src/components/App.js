import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { getInfo, getState, updateState } from 'actions/user';
import { getSubscription } from 'actions/subscription';
import { getUserSubscription } from 'actions/userSubscription';
import pusher from 'utils/pusher';
import { QuestionState } from 'constants/question';
import { showModal } from 'actions/modal';
import { ModalKey } from 'constants/modal';
import ModalContainer from './Modals';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Pricing from './Pricing';
import Profile from './Profile';
import Question from './Question';
import FindExpert from './FindExpert';
import Transaction from './Transaction';
import QuestionHistory from './QuestionHistory';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(({ user }) => user.loggedIn);
  const [isPusherSetup, setIsPusherSetup] = useState(false);

  const handleStateChange = (state) => {
    if (state.state === null && state.preState === 'Failed') {
      dispatch(showModal(ModalKey.QUESTION_DEAD));
    }

    if (state.state === QuestionState.WORKING) {
      window.location.href = `/question/${state.question?.id}`;
    }

    if (state.state === QuestionState.RATING) {
      dispatch(showModal(ModalKey.RATE, { questionId: state.question?.id }));
    }

    dispatch(getState());
  };

  const setupPusher = async () => {
    const { result } = await dispatch(getInfo());
    if (result) {
      await pusher.connect();
      setIsPusherSetup(true);
      pusher.subscribe('account', result.id);
      pusher.bind('account', 'state_change', handleStateChange);
    }
  };

  const handleUserState = async () => {
    const { result } = await dispatch(getState());
    // Expert is having a routing question
    if (result && [QuestionState.NOT_ROUTED, QuestionState.NO_KING, QuestionState.HAS_KING].includes(result.state)) {
      dispatch(showModal(ModalKey.MATCHING_EXPERT));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      setupPusher();
      handleUserState();
      dispatch(getSubscription());
      dispatch(getUserSubscription());
    }
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
        <Route path="/question/:questionId">
          <Question />
        </Route>
        <Route path="/find-expert">
          <FindExpert />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/question-history">
          <QuestionHistory />
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
