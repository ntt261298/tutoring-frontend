/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
    marginLeft: 30,
    height: 'calc(100vh - 100px)',
    position: 'relative',
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
    zIndex: 2,
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
  userVideoActions: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 400,
  },
  userVideoIcons: {
    margin: 8,
  },
}));

const VideoCall = () => {
  const classes = useStyles();
  const question = useSelector(state => state.question);
  const questionInfo = useSelector(state => state.question?.questionInfo);
  const socket = io(
    'http://localhost:5000', {
      query: { id: questionInfo.id },
    },
  ); const peer = new Peer(`expert-peer-${question?.expertId.toString()}`, {
    host: 'localhost',
    port: 9001,
    path: '/tutoring',
  });
  const personalVideo = useRef(null);
  const peerVideo = useRef(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [userMutedVideo, setUserMuteVideo] = useState(false);
  const [expertMutedVideo, setExpertMuteVideo] = useState(false);
  const [userTurnOffCamera, setUserTurnOffCamera] = useState(false);
  const [expertTurnOffCamera, setExpertTurnOffCamera] = useState(false);
  const [userDisconnectRoom, setUserDisconnectRoom] = useState(false);

  const setupSocket = () => {
    socket.on('User turned off camera', () => {
      setUserTurnOffCamera(true);
    });

    socket.on('User turned on camera', () => {
      setUserTurnOffCamera(false);
    });

    socket.on('User muted', () => {
      setUserMuteVideo(true);
    });

    socket.on('User unmuted', () => {
      setUserMuteVideo(false);
    });

    socket.on('Connect room', () => {
      setUserDisconnectRoom(false);
    });

    socket.on('Disconnect room', () => {
      setUserDisconnectRoom(true);
    });
  };

  const handleTurnOffCamera = () => {
    setExpertTurnOffCamera(true);
    socket.emit('Expert turned off camera');
  };

  const handleTurnOnCamera = () => {
    setExpertTurnOffCamera(false);
    socket.emit('Expert turned on camera');
  };

  const handleMute = () => {
    setExpertMuteVideo(true);
    socket.emit('Expert muted');
  };

  const handleUnmute = () => {
    setExpertMuteVideo(false);
    socket.emit('Expert unmuted');
  };

  const setupMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const call = peer.call(`user-peer-${questionInfo?.userId.toString()}`, stream);
    personalVideo.current.srcObject = stream;

    if (call) {
      call.on('stream', (remoteStream) => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = remoteStream;
        }
        setPeerConnected(true);
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
      setUserDisconnectRoom(false);
    });
  };

  const closeConnection = () => {
    handleMute();
    handleTurnOffCamera();
    if (personalVideo.current.srcObject) {
      personalVideo.current.srcObject.getVideoTracks()[0].stop();
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

    return () => closeConnection();
  }, []);

  return (
    <Paper className={classes.paper}>
      <Box>
        <video
          id="personalVideo"
          style={{ display: !expertTurnOffCamera ? 'block' : 'none' }}
          className={classes.personalVideo}
          muted
          ref={personalVideo}
          onLoadedMetadata={() => personalVideo.current.play()}
        />
        {expertTurnOffCamera && (
          <Box className={classes.personalNoVideo} style={{ color: 'white' }}>
            Turned off video
          </Box>
        )}
        <Box className={classes.videoActions}>
          {expertMutedVideo && <MicOffIcon color="secondary" className={classes.videoIcons} onClick={handleUnmute} />}
          {!expertMutedVideo && <MicIcon color="primary" className={classes.videoIcons} onClick={handleMute} />}
          {expertTurnOffCamera && <VideocamOffIcon color="secondary" className={classes.videoIcons} onClick={handleTurnOnCamera} />}
          {!expertTurnOffCamera && <VideocamIcon color="primary" className={classes.videoIcons} onClick={handleTurnOffCamera} />}
        </Box>
      </Box>
      <Box style={{ position: 'relative' }}>
        <video
          id="peerVideo"
          style={{ display: (peerConnected && !userTurnOffCamera && !userDisconnectRoom) ? 'block' : 'none' }}
          className={classes.peerVideo}
          muted={userMutedVideo}
          ref={peerVideo}
          onLoadedMetadata={() => peerVideo.current.play()}
        />
        {(!peerConnected || userTurnOffCamera) && !userDisconnectRoom && (
          <Box className={classes.peerNoVideo}>
            User turned off video
          </Box>
        )}
        {userDisconnectRoom && (
          <Box className={classes.peerNoVideo}>
            User disconnected
          </Box>
        )}
        <Box className={classes.userVideoActions}>
          {userMutedVideo && <MicOffIcon color="secondary" className={classes.userVideoIcons} />}
          {!userMutedVideo && <MicIcon color="primary" className={classes.userVideoIcons} />}
          {userTurnOffCamera && <VideocamOffIcon color="secondary" className={classes.userVideoIcons} />}
          {!userTurnOffCamera && <VideocamIcon color="primary" className={classes.userVideoIcons} />}
        </Box>
      </Box>
    </Paper>
  );
};

export default VideoCall;
