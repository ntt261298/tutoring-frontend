import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import LiveChat from 'react-livechat';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Copyright } from '@tutoring/commons/components';
import { LoginMessage } from 'constants/message';
import { loginEmail } from 'actions/user';
import configuration from 'configuration';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(images/tutoring.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'grey',
    opacity: '40%',
  },
  title: {
    zIndex: 2,
    opacity: 1,
    height: '100%',
    color: 'white',
    marginLeft: 20,
    bottom: 20,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    zIndex: 2,
    opacity: 1,
    height: '100%',
    color: 'white',
    marginLeft: 20,
    top: 20,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    margin: 5,
  },
}));

const validateLoginInput = (input) => {
  if (validator.isEmpty(input.email || '')) return LoginMessage.EMAIL_REQUIRED;
  if (!validator.isEmail(input.email)) return LoginMessage.EMAIL_INVALID;
  if (validator.isEmpty(input.password || '')) return LoginMessage.PASSWORD_REQUIRED;
  return null;
};

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onEmailLogin = async (e) => {
    e.preventDefault();
    const input = { email, password };

    const inputError = validateLoginInput(input);
    if (inputError) {
      setErrorMessage(inputError);
      return;
    }

    setSubmitting(true);
    const { error } = await dispatch(loginEmail(input));
    if (error) {
      let errorMsg = 'Login failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSubmitting(false);
    }
  };

  useEffect(() => () => window.LC_API.hide_chat_window(), []);

  return (
    <Grid container component="main" className={classes.root}>
      <LiveChat
        license={configuration.livechatLicense}
      />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.cover} />
        <h1 className={classes.title}>
          Apply for a job now and start earning money right away!
        </h1>
        <Typography component="h1" variant="h5" className={classes.subtitle}>
          You can make up to $500/week
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {errorMessage && (
            <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onEmailLogin}
              disabled={submitting}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Box variant="body2">
                Want to be an expert? Please contact our team via LiveChat
              </Box>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
