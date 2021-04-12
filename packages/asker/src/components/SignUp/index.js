import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { GoogleLoginButton, Copyright } from '@tutoring/commons/components';
import configuration from 'configuration';
import { SignUpMessage } from 'constants/message';
import { signupEmail } from 'actions/user';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(images/tutoring.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  },
}));

const PASSWORD_MIN_LENGTH = 6;

const validateSignupInput = (input) => {
  if (validator.isEmpty(input.email || '')) return SignUpMessage.EMAIL_REQUIRED;
  if (!validator.isEmail(input.email)) return SignUpMessage.EMAIL_INVALID;
  if (validator.isEmpty(input.password || '')) return SignUpMessage.PASSWORD_REQUIRED;
  if (input.password.length < PASSWORD_MIN_LENGTH) return SignUpMessage.PASSWORD_MIN_LENGTH;
  if (input.password !== input.confirmPassword) return SignUpMessage.PASSWORD_NOT_MATCH;
  return null;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onGoogleLoginSuccess = () => {};
  const onGoogleLoginFailure = () => {};

  const onEmailSignup = async (e) => {
    e.preventDefault();
    const input = { email, password, confirmPassword };

    const inputError = validateSignupInput(input);
    if (inputError) {
      setErrorMessage(inputError);
      return;
    }

    setSubmitting(true);
    const { error } = await dispatch(signupEmail(input));
    if (error) {
      let errorMsg = 'Signup failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
    } else {
      setErrorMessage(null);
      setSuccessMessage('Signup successfully!');
    }
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {errorMessage && (
            <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" className={classes.alert}>{successMessage}</Alert>
          )}
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <GoogleLoginButton
            buttonText="Sign up with Google"
            googleClientId={configuration.googleClientId}
            onGoogleLoginSuccess={onGoogleLoginSuccess}
            onGoogleLoginFailure={onGoogleLoginFailure}
          />
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onEmailSignup}
              disabled={submitting}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign In
              </Link>
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

export default SignUp;
