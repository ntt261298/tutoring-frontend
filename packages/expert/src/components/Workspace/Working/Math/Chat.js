import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import expertWorkingLogo from 'assets/images/expert-working.png';


const useStyles = makeStyles(theme => ({
  chatSection: {
    height: '100%',
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

const Chat = () => {
  const classes = useStyles();

  return (
    <Box component={Paper} className={classes.chatSection}>
      <Box className={classes.messageArea}>
        {/* Right message */}
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Box display="flex" alignItems="center">
            <Box
              component="span"
              p={1}
              m={1}
              fontSize="1rem"
              className={classes.bubblePersonal}
            >
              Hi there! How are you?
            </Box>
            <Avatar />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          padding="0 5px"
        >
          9:30 26/12/2020
        </Box>
        {/* Left message */}
        <Box
          display="flex"
          justifyContent="flex-start"
        >
          <Box display="flex" alignItems="center">
            <Avatar />
            <Box
              component="span"
              p={1}
              m={1}
              fontSize="1rem"
              className={classes.bubblePeer}
            >
              Hi there! How are you?
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          padding="0 5px"
        >
          9:30 26/12/2020
        </Box>
        {/* Right message */}
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Box display="flex" alignItems="center">
            <Box
              component="span"
              p={1}
              m={1}
              fontSize="1rem"
              className={classes.bubblePersonal}
            >
              Hi there! How are you?
            </Box>
            <Avatar />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          padding="0 5px"
        >
          9:30 26/12/2020
        </Box>
        {' '}
        {/* Right message */}
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Box display="flex" alignItems="center">
            <Box
              component="span"
              p={1}
              m={1}
              fontSize="1rem"
              className={classes.bubblePersonal}
            >
              Hi there! How are you?
            </Box>
            <Avatar />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          padding="0 5px"
        >
          9:30 26/12/2020
        </Box>
        {' '}
        {/* Right message */}
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Box display="flex" alignItems="center">
            <Box
              component="span"
              p={1}
              m={1}
              fontSize="1rem"
            >
              <img src={expertWorkingLogo} alt="chat" width={200} />
            </Box>
            <Avatar />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          padding="0 5px"
        >
          9:30 26/12/2020
        </Box>
      </Box>

      <Grid container className={classes.typeArea}>
        <Grid
          item
          xs={11}
          style={{ borderTop: '1px solid gray' }}
        >
          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
        </Grid>
        <Grid xs={1} align="right" className={classes.sendButton}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
