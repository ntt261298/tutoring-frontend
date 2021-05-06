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


export const formatTime = (string, format = 'HH:MM') => {
  // To write more time format in the future when needed.
  const date = new Date(string);
  // Return current local timezone (example 20:50)
  if (format === 'HH:MM') {
    return `${date.getFullHours()}:${date.getFullMinutes()}`;
  }
  return '';
};
