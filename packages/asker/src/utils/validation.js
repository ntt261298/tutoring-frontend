import { FileOption, FileMessage } from 'constants/common';

export const validateFile = (file) => {
  if (file.size > FileOption.MAX_SIZE) {
    return FileMessage.FILE_TOO_LARGE;
  }

  const aparts = file.name.split('.');
  if (aparts.length < 2) {
    return FileMessage.FILE_INVALID;
  }

  const ext = aparts.pop().toLowerCase();
  if (FileOption.ACCEPT.indexOf(ext) < 0) {
    return FileMessage.FILE_INVALID;
  }
  return null;
};
