import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { getQuestionById, newMessage } from 'actions/question';
import { showModal } from 'actions/modal';
import { QuestionState } from 'constants/question';
import { ModalKey } from 'constants/modal';
import { TopicId } from 'constants/common';
import pusher from 'utils/pusher';
import WorkingHeader from './WorkingHeader';
import Math from './Math';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Question = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [connecting, setConnecting] = useState(true);
  const match = useRouteMatch('/question/:questionId');
  const question = useSelector(({ user }) => user.workingState?.question);

  const pusherNewMessage = (message) => {
    dispatch(newMessage(message));
  };

  const pusherQuestionDone = () => {};

  const connectWithPusher = (questionId) => {
    pusher.subscribe('question', questionId);
    pusher.bind('question', 'new_message', pusherNewMessage);
    pusher.bind('question', 'question_done', pusherQuestionDone);
  };

  const disconnectPusher = () => {
    pusher.unsubscribe('question');
    pusher.unbind('question', 'new_message');
    pusher.unbind('question', 'question_done');
  };

  const fetchQuestionInfo = async () => {
    const { result } = await dispatch(getQuestionById(match.params.questionId));

    if (result) {
      const { state } = result.questionState;
      if ([QuestionState.FAILED, QuestionState.COMPLETE].indexOf(state) === -1) {
        connectWithPusher(result.id);
      }

      if (state === QuestionState.RATING) {
        dispatch(showModal(ModalKey.RATE, { questionId: result.id }));
      }
      setConnecting(false);
    } else {
      history.pushState('/home');
    }
  };

  useEffect(() => {
    fetchQuestionInfo();

    return () => disconnectPusher();
  }, []);

  if (connecting) {
    return (
      <Box className={classes.center}>Connecting...</Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <WorkingHeader />
      <Box className={classes.container}>
        {question?.topicId === TopicId.MATH && (
          <Math />
        )}
      </Box>
    </>
  );
};

export default Question;
