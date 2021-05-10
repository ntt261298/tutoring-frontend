import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import config from 'configuration';
import { loginWithGoogle } from 'actions/user';
import { showMessage, showErrorMsg } from 'utils/toastr';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 25,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  googleButton: {
    height: 48,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onGoogleLoginSuccess = async (response) => {
    const data = {
      authorizationCode: response.code,
    };

    const { result, error } = await dispatch(loginWithGoogle(data));

    if (result) {
      showMessage(
        'success',
        'Login Success',
        'Welcome to Tutoring Admin portal!',
      );
    } else {
      showErrorMsg(error.errorMessage);
    }
  };

  const onGoogleLoginFailure = (response) => {
    showErrorMsg(response.errorMessage);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Welcome to
          </Typography>
          <Typography component="h1" variant="h5">
            Tutoring Admin panel
          </Typography>
          <div className={classes.googleButton}>
            <GoogleLogin
              responseType="code"
              style={{ margin: '0 auto', width: '100%' }}
              clientId={config.googleClientId}
              onSuccess={onGoogleLoginSuccess}
              onFailure={onGoogleLoginFailure}
            >
              <span className="fa fa-google" />
              Sign in with Google
            </GoogleLogin>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
