import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';


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
    height: '95%',
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

const Messages = ({
  messages,
}) => {
  const classes = useStyles();

  if (!messages || messages.length === 0) {
    return (
      <Box component={Paper} className={classes.chatSection}>
        <Box component="h3">You have no message for this question</Box>
      </Box>
    );
  }

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
                        <img src={`data:image/${fileType};base64,${message.file?.renderedData}`} alt="chat" style={{ maxWidth: 200 }} />
                      </Box>
                    )}
                    {message.message && (
                      <Box
                        component="span"
                        p={1}
                        m={1}
                        fontSize="1rem"
                        className={classes.bubblePeer}
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
                      <img src={`data:image/${fileType};base64,${message.file?.renderedData}`} alt="chat" style={{ maxWidth: 200 }} />
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
    </Box>
  );
};

export default Messages;
