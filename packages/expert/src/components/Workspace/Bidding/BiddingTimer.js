import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import timestamp from 'utils/timestamp';

const BiddingTimer = ({
  remainingTime,
  onTimeOut = () => {},
}) => {
  const [biddingTime, setBiddingTime] = useState(remainingTime || 0);
  const latestBiddingTime = useRef({});

  let timerId = 0;

  const startTimer = (totalSeconds) => {
    const startTime = timestamp.now();
    if (timerId > 0) {
      return;
    }
    timerId = window.setInterval(
      () => {
        if (latestBiddingTime.current > 0) {
          setBiddingTime(totalSeconds - (timestamp.now() - startTime));
        } else {
          window.clearInterval(timerId);
          timerId = 0;
          onTimeOut();
        }
      }, 1000,
    );
  };

  const clearTimer = () => {
    if (timerId > 0) {
      window.clearInterval(timerId);
    }
  };

  useEffect(() => {
    latestBiddingTime.current = biddingTime;
  });

  useEffect(() => {
    if (biddingTime > 0) {
      startTimer(biddingTime);
    }
    return () => clearTimer();
  }, []);

  return (
    <Box>
      <Box component="h4">
        Bidding time left:
        {' '}
        {timestamp.format(biddingTime)}
      </Box>
    </Box>
  );
};

export default BiddingTimer;
