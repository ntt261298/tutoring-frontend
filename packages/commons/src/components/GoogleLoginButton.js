import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  googleButton: {
    height: 48,
    width: '100%',
    display: 'flex',
    margin: '5px 0',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const GoogleLoginButton = ({
  buttonText,
  googleClientId,
  onGoogleLoginSuccess,
  onGoogleLoginFailure,
}) => {
  const classes = useStyles();
  return (
    <GoogleLogin
      responseType="code"
      className={classes.googleButton}
      style={{ margin: '0 auto' }}
      clientId={googleClientId}
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
    >
      <span className="fa fa-google" />
      {buttonText}
    </GoogleLogin>
  );
};

export default GoogleLoginButton;
