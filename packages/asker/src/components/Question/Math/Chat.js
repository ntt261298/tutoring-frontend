import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { sendMessage } from 'actions/question';


const useStyles = makeStyles(theme => ({
  chatSection: {
    height: 'calc(100vh - 100px)',
    position: 'relative',
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '85%',
    width: '100%',
    overflowY: 'scroll',
  },
  typeArea: {
    position: 'absolute',
    bottom: 20,
    padding: '0 20px',
  },
  sendButton: {
    marginTop: 10,
  },
  bubblePersonal: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  bubblePeer: {
    padding: 10,
    borderRadius: 10,
    border: '1px solid #1976d2',
  },
}));

const ImageExtension = {
  SVG: 'svg',
  PNG: 'png',
};

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState('');
  const questionId = useSelector(state => state.question?.id);
  const messages = useSelector(state => state.question?.messages);

  const handleSendMessage = async () => {
    if (!currentMessage) {
      return;
    }

    const data = {
      questionId,
      message: currentMessage,
    };

    const { result } = await dispatch(sendMessage(data));
    if (result) {
      setCurrentMessage('');
    }
  };

  return (
    <Box component={Paper} className={classes.chatSection}>
      <Box className={classes.messageArea}>
        {messages && messages.map((message) => {
          let fileType = 'svg+xml';
          if (message.file) {
            const fileExtension = message.file.name.split('.').pop();
            if (fileExtension === ImageExtension.PNG) {
              fileType = 'png';
            }
          }

          if (message.expertId) {
            return (
              <>
                {/* Right message */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Box display="flex" alignItems="center">
                    {message.file && (
                      <Box
                        component="span"
                        p={1}
                        m={1}
                        fontSize="1rem"
                      >
                        <img src={`data:image/${fileType};base64,${message.file?.renderedData}`} alt="chat" width={200} />
                      </Box>
                    )}
                    {message.message && (
                      <Box
                        component="span"
                        p={1}
                        m={1}
                        fontSize="1rem"
                        className={classes.bubblePersonal}
                      >
                        {message.message}
                      </Box>
                    )}
                    <Avatar />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding="0 5px"
                >
                  {message.created.replace('T', ' ')}
                </Box>
              </>
            );
          }

          return (
            <>
              {/* Left message */}
              <Box
                display="flex"
                justifyContent="flex-start"
              >
                <Box display="flex" alignItems="center">
                  <Avatar />
                  {message.file && (
                    <Box
                      component="span"
                      p={1}
                      m={1}
                      fontSize="1rem"
                    >
                      <img src={`data:image/${fileType};base64,${message.file?.renderedData}`} alt="chat" width={200} />
                    </Box>
                  )}
                  {message.message && (
                    <Box
                      component="span"
                      p={1}
                      m={1}
                      fontSize="1rem"
                      className={classes.bubblePersonal}
                    >
                      {message.message}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                padding="0 5px"
              >
                {message.created.replace('T', ' ')}
              </Box>
            </>
          );
        })
      }
      </Box>

      <Grid container className={classes.typeArea}>
        <Grid
          item
          xs={11}
          style={{ borderTop: '1px solid gray' }}
        >
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
          />
        </Grid>
        <Grid xs={1} align="right" className={classes.sendButton}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
