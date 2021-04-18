export const LoginMessage = {
  EMAIL_REQUIRED: 'Please enter email address.',
  EMAIL_INVALID: 'You have entered an invalid email address. Please try again.',
  PASSWORD_REQUIRED: 'Please enter password.',
};

export const PasswordMessage = {
  PASSWORD_REQUIRED: 'Please enter password.',
  PASSWORD_MIN_LENGTH: 'At least 6 characters.',
  PASSWORD_NOT_MATCH: 'Password and confirm password do not match.',
};

export const SignUpMessage = {
  EMAIL_REQUIRED: 'Please enter email address.',
  EMAIL_INVALID: 'You have entered an invalid email address. Please try again',
  ...PasswordMessage,
};
