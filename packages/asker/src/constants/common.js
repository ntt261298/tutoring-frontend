import { SubscriptionAction } from './action';

export const ErrorCode = {
  UNAUTHORIZED: 40100,
};

export const LOCAL_STORAGE_PREFIX = 'thesis_tutoring.asker';

export const TopicId = {
  MATH: 1,
  ENGLISH: 2,
};

export const FileOption = {
  ACCEPT: '.jpg, .png, .jpeg',
  MAX_SIZE: 10 * 1024 * 1024, // 10 MB
  IMAGE_EXT: ['jpg', 'jpeg', 'png'],
};

export const FileMessage = {
  FILE_TOO_LARGE: 'Attachment size exceeds the allowable limit of 10MB.',
  FILE_INVALID: 'Attachment has an invalid file extension. Only .jpg, .jpeg, .png files are allowed.',
};

export const SubscriptionStatus = {
  ACTIVE: 'active',
  TERMINATED: 'terminated',
};
