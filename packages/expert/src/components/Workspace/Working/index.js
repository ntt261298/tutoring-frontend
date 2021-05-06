import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { TopicId } from 'constants/question';
import pusher from 'utils/pusher';
import { newMessage } from 'actions/question';
import Math from './Math';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
}));

const Working = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const questionInfo = useSelector(state => state.question?.questionInfo);

  const pusherNewMessage = (message) => {
    dispatch(newMessage(message));
  };

  const connectWithPusher = (questionId) => {
    pusher.subscribe('question', { id: questionId });
    pusher.bind('question', 'new_message', pusherNewMessage);
  };

  const disconnectPusher = () => {
    pusher.unsubscribe('question');
    pusher.unbind('question', 'new_message');
  };

  useEffect(() => {
    connectWithPusher(questionInfo?.id);

    return () => disconnectPusher();
  }, []);

  return (
    <Box className={classes.container}>
      {questionInfo?.topicId === TopicId.MATH && <Math />}
    </Box>
  );
};

export default Working;
