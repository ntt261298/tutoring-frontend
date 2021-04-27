import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { updateProfile, updatePassword, getInfo } from 'actions/user';
import { PasswordMessage } from 'constants/message';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';

const useStyles = makeStyles(() => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  avatarBox: {
    marginTop: 80,
  },
  nickname: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 600,
  },
  paper: {
    padding: 20,
  },
  textField: {
    margin: 5,
  },
  submitButton: {
    width: '100%',
    margin: '20px 5px 5px 5px',
  },
  alert: {
    width: '100%',
    margin: 5,
  },
}));

const PASSWORD_MIN_LENGTH = 6;

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector(({ user }) => user.email);
  const name = useSelector(({ user }) => user.nickname || '');
  const paymentMethod = useSelector(({ user }) => user.paymentMethod || '');

  const [nickname, setNickname] = useState(null);
  const [method, setMethod] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validatePassword = () => {
    if (validator.isEmpty(newPassword || '')) return PasswordMessage.PASSWORD_REQUIRED;
    if (newPassword.length < PASSWORD_MIN_LENGTH) return PasswordMessage.PASSWORD_MIN_LENGTH;
    return null;
  };

  const validateInput = () => {
    if (method !== null && !validator.isEmail(method)) {
      return 'Invalid payment method email.';
    }
    if (nickname !== null && validator.isEmpty(nickname)) {
      return 'Nick name should not be empty.';
    }
    return null;
  };

  const handleUpdateInfo = async () => {
    const inputError = validateInput();
    if (inputError) {
      setProfileSuccess(null);
      setProfileError(inputError);
      return;
    }

    const { error } = await dispatch(updateProfile({ nickname, paymentMethod: method }));
    if (error) {
      setProfileSuccess(null);
      setProfileError(error.data?.errorMessage);
    } else {
      dispatch(getInfo());
      setProfileError(null);
      setProfileSuccess('Update profile successfully!');
    }
  };

  const handleUpdatePassword = async () => {
    const inputError = validatePassword();
    if (inputError) {
      setPasswordSuccess(null);
      setPasswordError(inputError);
      return;
    }

    const { error } = await dispatch(updatePassword({ currentPassword, newPassword }));
    if (error) {
      setPasswordSuccess(null);
      setPasswordError(error.data?.errorMessage);
    } else {
      setPasswordError(null);
      setPasswordSuccess('Update password successfully!');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" component="main">
        <Box className={classes.avatarBox}>
          <Grid container spacing={2}>
            <Grid item>
              <AccountCircleIcon style={{ fontSize: 120 }} />
            </Grid>
            <Grid item xs={12} sm className={classes.nickname}>{name}</Grid>
          </Grid>
        </Box>
        <Box className={classes.content}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Paper variant="outlined" className={classes.paper}>
                <Box component="h1">Information</Box>
                {profileError && (
                  <Alert severity="error" className={classes.alert}>{profileError}</Alert>
                )}
                {profileSuccess && (
                  <Alert severity="success" className={classes.alert}>{profileSuccess}</Alert>
                )}
                <TextField
                  className={classes.textField}
                  label="Name"
                  fullWidth
                  value={nickname === null ? name : nickname}
                  onChange={e => setNickname(e.target.value)}
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  label="Paypal account"
                  fullWidth
                  value={method === null ? paymentMethod : method}
                  onChange={e => setMethod(e.target.value)}
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  label="Email"
                  fullWidth
                  value={email}
                  variant="filled"
                  disabled
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={handleUpdateInfo}
                >
                  Update profile
                </Button>
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paper variant="outlined" className={classes.paper}>
                <Box component="h1">
                  Change password
                </Box>
                {passwordError && (
                  <Alert severity="error" className={classes.alert}>{passwordError}</Alert>
                )}
                {passwordSuccess && (
                  <Alert severity="success" className={classes.alert}>{passwordSuccess}</Alert>
                )}
                <TextField
                  className={classes.textField}
                  label="Current password"
                  fullWidth
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  variant="filled"
                />
                <TextField
                  className={classes.textField}
                  label="New password"
                  fullWidth
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  variant="filled"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={handleUpdatePassword}
                >
                  Change password
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
