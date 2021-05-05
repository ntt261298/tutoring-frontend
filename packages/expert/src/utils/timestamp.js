const ts = {
  now: () => Math.floor(Date.now() / 1000),
  format: (totalSeconds) => {
    if (totalSeconds <= 0) {
      return '00:00';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds - (minutes * 60));
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  },
};

export default ts;
