import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Copyright } from '@tutoring/commons/components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  rightArea: {
    textAlign: 'center',
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const DESCRIPTIONS = ['0397364341', 'ntt261298@gmail.com', 'Hanoi University of Science and Technology'];

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Designed by Truong Nguyen
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <div className={classes.rightArea}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Contact me:
            </Typography>
            <ul>
              {DESCRIPTIONS.map(item => (
                <li key={item}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Footer;
