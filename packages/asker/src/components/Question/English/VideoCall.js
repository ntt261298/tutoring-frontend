/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
    marginLeft: 30,
    height: 'calc(100vh - 100px)',
    position: 'relative',
  },
  centerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  peerVideo: {
    width: '100%',
    height: 'calc(100vh - 100px)',
  },
  personalVideo: {
    position: 'absolute',
    width: '267px',
    height: '200px',
    border: '1px solid black',
    bottom: 10,
    right: 10,
    background: 'black',
  },
  personalNoVideo: {
    position: 'absolute',
    width: '267px',
    height: '200px',
    border: '1px solid black',
    bottom: 10,
    right: 10,
    background: 'black',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  peerNoVideo: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: 'calc(100vh - 100px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoActions: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 95,
  },
  videoIcons: {
    margin: 8,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  expertVideoActions: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 400,
  },
  expertVideoIcons: {
    margin: 8,
  },
}));

const VideoCall = () => {
  const classes = useStyles();
  const question = useSelector(state => state.question);
  const socket = io(
    'http://localhost:5000', {
      query: { id: question.id },
    },
  );
  const peer = new Peer(question?.userId.toString(), {
    host: 'localhost',
    port: 9001,
    path: '/tutoring',
  });
  const personalVideo = useRef(null);
  const peerVideo = useRef(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [expertMutedVideo, setExpertMuteVideo] = useState(false);
  const [userMutedVideo, setUserMuteVideo] = useState(false);
  const [expertTurnOffCamera, setExpertTurnOffCamera] = useState(false);
  const [userTurnOffCamera, setUserTurnOffCamera] = useState(false);
  const [expertDisconnected, setExpertDisconnected] = useState(false);

  const setupSocket = () => {
    socket.on('Expert turned off camera', () => {
      setExpertTurnOffCamera(true);
    });

    socket.on('Expert turned on camera', () => {
      setExpertTurnOffCamera(false);
    });

    socket.on('Expert muted', () => {
      setExpertMuteVideo(true);
    });

    socket.on('Expert unmuted', () => {
      setExpertMuteVideo(false);
    });

    socket.on('Connect room', () => {
      setExpertDisconnected(false);
    });

    socket.on('Disconnect room', () => {
      setExpertDisconnected(true);
    });
  };

  const handleTurnOffCamera = () => {
    setUserTurnOffCamera(true);
    socket.emit('User turned off camera');
  };

  const handleTurnOnCamera = () => {
    setUserTurnOffCamera(false);
    socket.emit('User turned on camera');
  };

  const handleMute = () => {
    setUserMuteVideo(true);
    socket.emit('User muted');
  };

  const handleUnmute = () => {
    setUserMuteVideo(false);
    socket.emit('User unmuted');
  };

  const setupMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    personalVideo.current.srcObject = stream;

    const call = peer.call(question?.expertId.toString(), stream);

    if (call) {
      call.on('stream', (remoteStream) => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = remoteStream;
        }
        setPeerConnected(true);
        setExpertDisconnected(false);
      });
    }
  };

  const setupPeer = async (call) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', (remoteStream) => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = remoteStream;
      }
      setPeerConnected(true);
    });
  };

  const closePeer = () => {
    if (personalVideo.current.srcObject) {
      personalVideo.current.srcObject.getVideoTracks()[0].stop();
    }
    if (peerVideo.current.srcObject) {
      peerVideo.current.srcObject.getVideoTracks()[0].stop();
    }
    socket.disconnect();
  };

  useEffect(() => {
    setupSocket();
    setupMedia();
    peer.on('call', (call) => {
      setupPeer(call);
    });

    peer.on('connection', () => {
      setPeerConnected(true);
    });

    return () => closePeer();
  }, []);

  return (
    <Paper className={classes.paper}>
      <Box>
        <video
          id="personalVideo"
          style={{ display: !userTurnOffCamera ? 'block' : 'none' }}
          className={classes.personalVideo}
          muted
          ref={personalVideo}
          onLoadedMetadata={() => personalVideo.current.play()}
        />
        {userTurnOffCamera && (
          <Box className={classes.personalNoVideo} style={{ color: 'white' }}>
            Turned off video
          </Box>
        )}
        <Box className={classes.videoActions}>
          {userMutedVideo && <MicOffIcon color="secondary" className={classes.videoIcons} onClick={handleUnmute} />}
          {!userMutedVideo && <MicIcon color="primary" className={classes.videoIcons} onClick={handleMute} />}
          {userTurnOffCamera && <VideocamOffIcon color="secondary" className={classes.videoIcons} onClick={handleTurnOnCamera} />}
          {!userTurnOffCamera && <VideocamIcon color="primary" className={classes.videoIcons} onClick={handleTurnOffCamera} />}
        </Box>
      </Box>
      <Box>
        <video
          id="peerVideo"
          style={{ display: (peerConnected && !expertTurnOffCamera && !expertDisconnected) ? 'block' : 'none' }}
          className={classes.peerVideo}
          muted={expertMutedVideo}
          ref={peerVideo}
          onLoadedMetadata={() => peerVideo.current.play()}
        />
        {(!peerConnected || expertTurnOffCamera) && !expertDisconnected && (
          <Box className={classes.peerNoVideo}>
            Expert turned off video
          </Box>
        )}
        {expertDisconnected && (
          <Box className={classes.peerNoVideo}>
            Expert disconnected
          </Box>
        )}
        <Box className={classes.expertVideoActions}>
          {expertMutedVideo && <MicOffIcon color="secondary" className={classes.expertVideoIcons} />}
          {!expertMutedVideo && <MicIcon color="primary" className={classes.expertVideoIcons} />}
          {expertTurnOffCamera && <VideocamOffIcon color="secondary" className={classes.expertVideoIcons} />}
          {!expertTurnOffCamera && <VideocamIcon color="primary" className={classes.expertVideoIcons} />}
        </Box>
      </Box>
    </Paper>
  );
};

export default VideoCall;
